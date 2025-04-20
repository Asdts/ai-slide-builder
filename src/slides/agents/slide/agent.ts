import { BaseAgent } from "@/slides/agents/baseAgent";

export class FirstSlideAgent extends BaseAgent {
  static NAME = "firstSlideAgent";
  NAME = FirstSlideAgent.NAME;

  protected authPrompt(
    theme: string,
    settings: string,
    audience: string,
    themeExample: string,
    topic: string
  ): string {
    return `
            You are an expert in creating visually stunning Marp markdown presentations. Your task is to generate the **first two slides** for a presentation on the topic: **"${topic}"**.

            You specialize in content generation, intelligent formatting, and delivering value to the intended audience: **${audience}**.

            ---

            ### 📝 Input Details:

            - **Theme**: ${theme}
            - **Settings**: ${settings}
            - **Theme Example** (for formatting reference):
            ${themeExample}

            ---

            ### 🎯 Instructions:

            1. Create a **title slide**:
            - Start with \`#\` for the title (H1).
            - Include a short description (1–2 lines).
            - Optionally include an author name (regular text).

            2. Add **1 more slide** with relevant content for the topic. Use:
            - Bullet points for clarity
            - Headings/subheadings where appropriate
            - Code blocks (multiline fenced blocks) if relevant

            3. Never use full paragraphs on slides.

            4. Make content visually appealing using available Marp formatting.

            5. ⚠️ Do **not** end your response with \`---\` as it will render a blank slide.

            ---

            ### 🔐 Output Format:

            Respond **only** with a valid Marp markdown block enclosed like this:

            \`\`\`md
            <your slide markdown here>
            \`\`\`

    `.trim();
  }
}
