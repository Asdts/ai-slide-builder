import { BaseAgent } from "@/slides/agents/baseAgent";

export class OutlineAgent extends BaseAgent {
  static NAME = "outlineAgent";
  NAME = OutlineAgent.NAME;

  protected authPrompt(
    topic: string,
    audience: string,
    objective: string,
    tone: string = "professional"
  ): string {
    return `
You are a highly skilled presentation planner. Your task is to generate a complete outline for a Marp markdown presentation on the topic: **"${topic}"**.

---

### 🧑‍🏫 Audience

${audience}

---

### 🎯 Objective

${objective}

---

### ✍️ Instructions

1. Create a slide-by-slide outline for the presentation.
2. Each slide should include:
   - A short **Slide Title**
   - A **one-line summary** describing the purpose or content of the slide
3. Organize the outline logically, progressing from introduction to conclusion.
4. Use a **numbered list** format for clarity.
5. Ensure the tone is **${tone}** and suitable for the given audience.

---

### 📦 Output Format

Respond in the format below:

\`\`\`
1. Slide Title – one-line summary
2. Slide Title – one-line summary
...
\`\`\`

Do not include any additional commentary outside the outline.
    `.trim();
  }
}
