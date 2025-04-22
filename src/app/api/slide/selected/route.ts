/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { handleAgentRequest } from '@/utils/agentHandler';
import connectDB from '@/connection/dbConn';
import Slide from '@/model/slide.model';
import SlideDeck from '@/model/slideDeck.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const result  = await handleAgentRequest(body, 'SelectedAgent', () => [
      body.content,
      body.theme,
      body.settings,
      body.audience,
      body.themeExample,
      body.topic
    ]) as any;

    // const slideMarkdowns = result.trim().split(/^---$/gm);
    console.log("Generated result:", result);
      const cleanedResult = result.replace(/```md|```/g, '').trim();
      const slideMarkdowns = cleanedResult.split(/^---$/gm);

    const newSlides = await Promise.all(
      slideMarkdowns.map(async (content: string, index: number) => {
        return await Slide.create({
          slideIndex: body.startIndex + index,
          contentMarkdown: content.trim(),
          previousContent: body.content,
          type: "edited"
        });
      })
    );

    let updatedDeck = null;
    if (body.deckId) {
      updatedDeck = await SlideDeck.findByIdAndUpdate(
        body.deckId,
        {
          $push: {
            slides: { $each: newSlides.map(s => s._id), $position: body.startIndex }
          }
        },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      slides: newSlides,
      ...(updatedDeck && { updatedDeck })
    }, { status: 201 });

  } catch (err: any) {
    console.error("Error in selected route:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
