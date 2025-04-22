/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { handleAgentRequest } from '@/utils/agentHandler';
import connectDB from '@/connection/dbConn';
import SlideDeck from '@/model/slideDeck.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const result = await handleAgentRequest(body, 'ExportAgent', () => [
      body.allSlidesMarkdown,
      body.title,
      body.author,
      body.theme,
      body.settings,
      body.exportFormat, // "pdf" or "pptx"
      body.footer || undefined
    ]) as any;

    let updatedDeck = null;
    if (body.deckId) {
      updatedDeck = await SlideDeck.findByIdAndUpdate(
        body.deckId,
        { $set: { exportedMarkdown: result.trim() } },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      exportedMarkdown: result.trim(),
      ...(updatedDeck && { updatedDeck })
    }, { status: 200 });

  } catch (err: any) {
    console.error("Error exporting slide deck:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
