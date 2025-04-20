/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "@/connection/dbConn";
import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(console.error);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Email not verified" }, { status: 400 });
    }

    // Create token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
