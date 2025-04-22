/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/connection/dbConn";
import { llm } from "@/connection/genAi";

// Connect to the database
await connectDB();

export async function POST(req: NextRequest) {
    try {
        //accept file from request
        const body = await req.json();
        const { file } = body;
        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file content provided" },
                { status: 400 }
            );
        }
        // Call the LLM to convert the file content to text
        const prompt = "convert the file content to text";
        const result = await llm({prompt , file});
        return NextResponse.json(
            {
                success: true,
                text: result,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Error in doc-to-text POST:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}