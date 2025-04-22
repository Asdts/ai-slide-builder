import { BaseAgent } from "@/slides/agents/baseAgent";

export class DocumentToSlidesAgent extends BaseAgent {
  static NAME = "documentToSlidesAgent";
  NAME = DocumentToSlidesAgent.NAME;

  protected authPrompt(
    extractedText: string,
    topic: string,
    theme: string,
    settings: string,
    audience: string,
    tone: string = "professional"
  ): string {
    return `
You are a skilled presentation designer and educator. Your task is to convert the given document content into a structured Marp markdown presentation.

---

### Source Text

${extractedText}

---

### Topic

${topic}

---

### Audience

${audience}

---

### Theme & Detail Settings

- Theme: ${theme}
- Detail Level: ${settings}
- Tone: ${tone}

---

### Instructions

1. Analyze the content and divide it into coherent slide sections.
2. For each major section or key point, create a new slide.
3. Follow Marp markdown format:
   - Use headings #, ## and bullet points
   - Use --- to separate slides
   - Keep each slide concise and visually clear
4. Use tone and structure appropriate for the selected audience.
5. Start with a title slide that includes the topic and a 1–2 line summary.
6. Do not include this prompt in the output.

---

### 📦 Output Format

Respond ONLY with Marp markdown:

\`\`\`md
<your slide markdown>
\`\`\`
    `.trim();
  }
}
