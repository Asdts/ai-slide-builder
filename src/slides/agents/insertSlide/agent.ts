import { BaseAgent } from "@/slides/agents/baseAgent";

export class InsertSlideAgent extends BaseAgent {
  static NAME = "insertSlideAgent";
  NAME = InsertSlideAgent.NAME;

  protected authPrompt(
    previousSlide: string,
    nextSlide: string,
    topic: string,
    theme: string,
    settings: string,
    audience: string,
    tone: string = "professional"
  ): string {
    return `
You are a presentation expert skilled in content flow and logical transitions. Your task is to create **one intermediate Marp slide** that fits **between** the two provided slides.

---

### 📌 Topic

${topic}

---

### 🧑‍🏫 Audience

${audience}

---

### 🎨 Theme & Settings

- Theme: ${theme}
- Settings: ${settings}
- Tone: ${tone}

---

### ⬅️ Previous Slide

${previousSlide}

---

### ➡️ Next Slide

${nextSlide}

---

### ✅ Instructions

1. Create **exactly one** slide that bridges the above two slides.
2. The new slide should:
   - Maintain logical flow
   - Introduce a sub-topic or continuation naturally
   - Avoid repeating content from either slide
3. Use Marp formatting:
   - Headings (\`#\`, \`##\`)
   - Bullet points
   - Code blocks (if applicable)
4. Ensure content **fits visually** and avoids full paragraphs.
5. Do **not** end with a standalone \`---\`.

---

### 📦 Output Format

Respond ONLY with a valid Marp markdown block:

\`\`\`md
<your inserted slide here>
\`\`\`
    `.trim();
  }
}
