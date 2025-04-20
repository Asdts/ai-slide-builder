/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "@/connection/dbConn";
import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerMail } from "@/utils/mailer";
import {  apillm } from "@/connection/genAi";
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse request body
    const { username, email, password , phoneNumber , geminiApiKey , geminiApiSecret } = await req.json();

    // Validate input
    if (!username || !email || !password || !phoneNumber || !geminiApiKey || !geminiApiSecret) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const testApiKey = await apillm("test", geminiApiKey);
    if (!testApiKey) {
      return NextResponse.json({ error: "Invalid Gemini API Key" }, { status: 400 });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const geminiApiSecretHash = await jwt.sign(
      { geminiApiSecret },
      process.env.TOKEN_SECRET!
    );
    const geminiApiKeyHash = await jwt.sign(
      { geminiApiKey },
      geminiApiSecret
    );
    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      isVerified: false,
      geminiApiKey: geminiApiKeyHash,
      geminiApiSecret: geminiApiSecretHash,
    });
    const savedUser = await newUser.save();

    // Send verification email
    try {
      await sendVerMail({ email, emailType: "verify", userId: savedUser._id });
    } catch (emailError: any) {
      console.error("Email sending failed:", emailError.message);
    }

    // Return success response without sensitive info
    const { password : any, ...userDetails } = savedUser.toObject();
    return NextResponse.json(
      { message: "User created successfully", user: userDetails },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in user registration:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error, please try again later" },
      { status: 500 }
    );
  }
}