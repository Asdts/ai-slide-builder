import { BaseAgent } from "@/slides/agents/baseAgent";

export class SummaryAgent extends BaseAgent {
  static NAME = "summaryAgent";
  NAME = SummaryAgent.NAME;

  protected authPrompt(previousContent: string, currentContent: string): string {
    return `
        You are a summarization expert. Your task is to create a **comprehensive and coherent summary** that captures all essential information from the provided slide content.

        The goal is to help generate the **next slide** without repeating information or losing context.

        ---

        ### 🧾 Previous Slide Summary

        ${previousContent}

        ---

        ### 🆕 Current Slide Content

        ${currentContent}

        ---

        ### ✅ Instructions

        1. Combine both pieces of content into a clear and complete summary.
        2. Do **not omit** any critical points — missing them may lead to unintentional repetition in future slides.
        3. The summary should be concise but detailed enough to preserve continuity and context.
        4. Avoid bullet formatting — this is a backend summary, not a slide.
        5. Ensure the summary reads fluently and logically.

        Return only the text of the merged summary.
    `.trim();
  }
}
