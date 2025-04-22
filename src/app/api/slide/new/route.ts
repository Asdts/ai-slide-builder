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

    const result = await handleAgentRequest(body, 'NewSlideAgent', () => [
      body.previousContent,
      body.theme,
      body.settings,
      body.audience,
      body.themeExample,
      body.topic
    ]) as any;

    // const slides = result.trim().split(/^---$/gm);
    console.log("Generated result:", result);
    const cleanedResult = result.replace(/```md|```/g, '').trim();
    const slides = cleanedResult.split(/^---$/gm);
    // console.log(slides)
    const createdSlides = await Promise.all(
      slides.map(async (slideMarkdown: string, index: number) => {
        return await Slide.create({
          slideIndex: body.startIndex + index,
          contentMarkdown: slideMarkdown.trim(),
          previousContent: body.previousContent,
          type: "new"
        });
      })
    );

    console.log("Created slides:", createdSlides);

    let updatedDeck = null;
    if (body.deckId) {
      updatedDeck = await SlideDeck.findByIdAndUpdate(
        body.deckId,
        { $push: { slides: { $each: createdSlides.map(s => s._id) } } },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      slides: createdSlides,
      ...(updatedDeck && { updatedDeck })
    }, { status: 201 });

  } catch (err: any) {
    console.error("Error in new-slide POST:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
