/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { handleAgentRequest } from "@/utils/agentHandler";
import connectDB from "@/connection/dbConn";
import SlideDeck from "@/model/slideDeck.model";
import Slide from "@/model/slide.model";

// Connect to the database
await connectDB();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await handleAgentRequest(body, "DocToSlideAgent", () => [
        body.docContent,
        body.theme,
        body.settings,
        body.audience,
        body.themeExample,
        ]) as any;
        console.log("Generated result:", result);
        const cleanedResult = result.replace(/```md|```/g, "").trim();
        const slides = cleanedResult.split(/^---$/gm);
        console.log("Generated slides:", slides);
        const createdSlides = await Promise.all(
        slides.map(async (slideMarkdown: string, index: number) => {
            return await Slide.create({
            slideIndex: index,
            contentMarkdown: slideMarkdown.trim(),
            type: "new",
            });
        })
        );
        console.log("Created slides:", createdSlides);
        let updatedDeck = null;
        if (body.deckId) {
            updatedDeck = await SlideDeck.findByIdAndUpdate(
            body.deckId,
            { $push: { slides: { $each: createdSlides.map((s) => s._id) } } },
            { new: true }
            );
        }
        return NextResponse.json(
        {
            success: true,
            slides: createdSlides,
            ...(updatedDeck && { updatedDeck }),
        },
        { status: 201 }
        );
    } catch (err: any) {
        console.error("Error in doc-to-slide POST:", err);
        return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
        );
    }
}