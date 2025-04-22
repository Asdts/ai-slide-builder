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

    // Step 1: Generate the bridging slide
    const result = await handleAgentRequest(body, 'InsertSlideAgent', () => [
      body.previousSlide,
      body.nextSlide,
      body.topic,
      body.theme,
      body.settings,
      body.audience,
      body.tone || "professional"
    ]) as any;

    // const insertedSlideMarkdown = result.trim();
    console.log("Generated result:", result);
    const insertedSlideMarkdown = result.replace(/```md|```/g, '').trim();
    // const insertedSlideMarkdown = cleanedResult.split(/^---$/gm);

    // Step 2: Increment slideIndex of all slides coming after `insertAfterIndex`
    await Slide.updateMany(
      { slideIndex: { $gt: body.insertAfterIndex }, _id: { $in: body.slideIds } },
      { $inc: { slideIndex: 1 } }
    );

    // Step 3: Insert new slide at insertAfterIndex + 1
    const newSlide = await Slide.create({
      slideIndex: body.insertAfterIndex + 1,
      contentMarkdown: insertedSlideMarkdown,
      previousContent: body.previousSlide,
      type: "inserted"
    });

    // Step 4: Update SlideDeck with new slide ID
    const updatedDeck = await SlideDeck.findByIdAndUpdate(
      body.deckId,
      {
        $push: {
          slides: {
            $each: [newSlide._id],
            $position: body.insertAfterIndex + 1
          }
        }
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      insertedSlide: newSlide,
      updatedDeck
    }, { status: 201 });

  } catch (err: any) {
    console.error("Error inserting slide:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
