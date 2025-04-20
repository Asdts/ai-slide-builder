import { BaseAgent } from "@/slides/agents/baseAgent";

export class StylingAgent extends BaseAgent {
  static NAME = "stylingAgent";
  NAME = StylingAgent.NAME;

  protected authPrompt(
    markdownContent: string,
    theme: string,
    stylingInstructions: string,
    audience: string,
    tone: string = "professional"
  ): string {
    return `
You are an expert presentation designer skilled in Marp markdown styling and visual formatting. Your task is to **apply styling and layout enhancements** to the given slide content to make it more engaging and visually aligned with the intended audience.

---

### 📄 Original Markdown Content

${markdownContent}

---

### 🎨 Styling Instructions

${stylingInstructions}

Examples of what may be included:
- Font size changes
- Text alignment
- Slide layout classes (e.g. lead, invert, full, center, etc.)
- Bullet styling
- Padding, margin, and spacing hints
- Heading emphasis
- Custom class names (if theme supports them)

---

### 🧑‍🏫 Audience

${audience}

---

### 🎯 Tone

${tone}

---

### ⚙️ Theme

${theme}

---

### ✅ Guidelines

1. Do **not** change the core content or message.
2. Apply **only styling-related** changes — don’t rewrite or rephrase.
3. Use Marp-compatible syntax (YAML frontmatter, HTML classes, etc.)
4. Make sure the final slide still renders well in Marp.
5. Avoid ending with a standalone \`---\`.

---

### 📦 Output Format

Respond with valid Marp markdown block wrapped as:

\`\`\`md
<styled slide markdown>
\`\`\`

    `.trim();
  }
}
