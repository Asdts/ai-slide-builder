/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/auth/check.ts
import { NextRequest, NextResponse } from "next/server";
import connect from "@/connection/dbConn";
import User from "@/model/user.model";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(console.error);

export async function GET(req: NextRequest) {
    try{
        const token = req.cookies.get("token")?.value;
        // console.log("Token:", token);
        if (!token) {
            return NextResponse.json(
                { error: "Token not found" },
                { status: 401 }
            );
        }

        const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User verified successfully", user },
            { status: 200 }
        );
    }catch(error:any){
        console.error("Error in user verification:", error.message);
        return NextResponse.json(
            { error: "Internal Server Error, please try again later" },
            { status: 500 }
        );
    }
}