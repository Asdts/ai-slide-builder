/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { handleAgentRequest } from '@/utils/agentHandler';
import connectDB from '@/connection/dbConn';
import Slide from '@/model/slide.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const  result = await handleAgentRequest(body, 'StylingAgent', () => [
      body.markdownContent,
      body.theme,
      body.stylingInstructions,
      body.audience,
      body.tone || 'professional'
    ]) as any;

    const updatedSlide = await Slide.findByIdAndUpdate(
      body.slideId,
      {
        $set: {
          contentMarkdown: result.trim(),
          type: "edited"
        }
      },
      { new: true }
    );

    if (!updatedSlide) {
      return NextResponse.json({
        success: false,
        error: "Slide not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      updatedSlide
    }, { status: 200 });

  } catch (err: any) {
    console.error("Error in styling route:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
