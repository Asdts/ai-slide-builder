import { BaseAgent } from "@/slides/agents/baseAgent";

export class RegenerateAgent extends BaseAgent {
  static NAME = "regenerateAgent";
  NAME = RegenerateAgent.NAME;

  protected authPrompt(
    originalSlide: string,
    topic: string,
    theme: string,
    settings: string,
    audience: string,
    tone: string = "professional"
  ): string {
    return `
You are a presentation expert specializing in rewriting and improving individual Marp markdown slides. Your task is to **regenerate** the following slide content with improved formatting, tone, and structure, while preserving its original intent.

---

### 🧠 Topic

${topic}

---

### 🎯 Audience

${audience}

---

### 🎨 Theme & Settings

- Theme: ${theme}
- Settings: ${settings}
- Preferred tone: ${tone}

---

### 📝 Slide to Regenerate

${originalSlide}

---

### ✅ Instructions

1. Keep the meaning and message intact but **improve** how the content is structured and styled.
2. Use Marp formatting best practices:
   - Headings (\`#\`, \`##\`)
   - Bullet points for clarity
   - Multi-line code blocks for technical content
3. Ensure the slide content **fits visually** and does **not use long paragraphs**.
4. Do **not** end with a standalone \`---\`.

---

### 📦 Output Format

Respond ONLY with valid Marp markdown like this:

\`\`\`md
<your regenerated slide here>
\`\`\`

    `.trim();
  }
}
