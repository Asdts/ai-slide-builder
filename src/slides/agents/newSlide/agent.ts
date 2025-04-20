import { BaseAgent } from "@/slides/agents/baseAgent";

export class NewSlideAgent extends BaseAgent {
  static NAME = "newSlideAgent";
  NAME = NewSlideAgent.NAME;

  protected authPrompt(
    previousContent: string,
    theme: string,
    settings: string,
    audience: string,
    themeExample: string,
    topic: string
  ): string {
    return `
            You are an expert in creating engaging and visually rich Marp markdown presentations. Your task is to **generate the next 2 slides** for a presentation on the topic: **"${topic}"**.

            You have access to the previous slide content and should continue the narrative seamlessly while ensuring readability and visual appeal.

            ---

            ### 📚 Previous Content

            ${previousContent}

            ---

            ### 📌 Configuration

            - **Theme**: ${theme}
            - **Settings**: ${settings}
            - **Audience**: ${audience}
            - **Theme Example** (reference for layout/style):
            ${themeExample}

            ---

            ### 🧠 Guidelines

            1. **Do NOT repeat** content from previous slides.
            2. Use bullet points or brief phrases — **avoid long paragraphs**.
            3. Leverage Marp formatting options for:
            - Bullet points
            - Headings/subheadings
            - Multi-line \`\`\` code blocks
            4. Ensure slide content fits well within the slide area.
            5. **Avoid** ending the response with a standalone \`---\` to prevent blank slides.
            6. Use your creativity to keep the presentation interesting and informative.

            ---

            ### 🔐 Output Format

            Respond ONLY with valid Marp markdown enclosed like this:

            \`\`\`md
            <your 2 slides here>
            \`\`\`

    `.trim();
  }
}
