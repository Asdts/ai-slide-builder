/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { handleAgentRequest } from '@/utils/agentHandler';
import connectDB from '@/connection/dbConn';
import SlideDeck from '@/model/slideDeck.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { result } = await handleAgentRequest(body, 'SummaryAgent', () => [
      body.previousContent,
      body.currentContent
    ]) as any;

    let updatedDeck = null;
    if (body.deckId) {
      updatedDeck = await SlideDeck.findByIdAndUpdate(
        body.deckId,
        { $set: { summary: result.trim() } },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      summary: result.trim(),
      ...(updatedDeck && { updatedDeck })
    }, { status: 200 });

  } catch (err: any) {
    console.error("Error in summary route:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
