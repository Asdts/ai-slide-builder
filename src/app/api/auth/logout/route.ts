import { NextResponse } from "next/server";

export async function GET() {
    const Response = NextResponse.json({
        message: "logout success",
        success: true,
    },{
        status:200
    });
    Response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    return Response;
}