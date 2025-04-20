import { BaseAgent } from "@/slides/agents/baseAgent";

export class SelectedAgent extends BaseAgent {
  static NAME = "selectedAgent";
  NAME = SelectedAgent.NAME;

  protected authPrompt(
    content: string,
    theme: string,
    settings: string,
    audience: string,
    themeExample: string,
    topic: string
  ): string {
    return `
            You are an expert in transforming content into beautiful, effective Marp markdown presentations. Your task is to **revise the selected content** into 1–2 slides under the topic: **"${topic}"**.

            You will enhance the clarity, formatting, and presentation quality using appropriate Marp features.

            ---

            ### ✏️ Selected Content to Modify:

            ${content}

            ---

            ### 🎨 Configuration

            - **Theme**: ${theme}
            - **Settings**: ${settings}
            - **Audience**: ${audience}
            - **Theme Example** (reference for formatting):
            ${themeExample}

            ---

            ### 🔧 Instructions

            1. Convert the given content into **1–2 clean slides**.
            2. Use:
            - Bullet points
            - Headings (\`#\`, \`##\`, etc.)
            - Multi-line code blocks for any technical content
            3. Avoid paragraphs — keep content concise and slide-ready.
            4. Ensure slides are visually appealing and readable.
            5. **Do NOT** end with a standalone \`---\`.

            ---

            ### 📦 Output Format

            Wrap your result like this:

            \`\`\`md
            <your Marp slides here>
            \`\`\`

    `.trim();
  }
}
