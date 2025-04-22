// /src/slides/agents/export/agent.ts
// created by ASDTS
import { BaseAgent } from "@/slides/agents/baseAgent";

export class ExportAgent extends BaseAgent {
  static NAME = "exportAgent";
  NAME = ExportAgent.NAME;

  protected authPrompt(
    allSlidesMarkdown: string,
    title: string,
    author: string,
    theme: string,
    settings: string,
    exportFormat: "pdf" | "pptx",
    footer?: string
  ): string {
    return `
You are a Marp markdown export assistant. Your task is to prepare the **final Marp presentation file** with appropriate metadata and formatting for export to **${exportFormat.toUpperCase()}** format using \`marp-cli\`.

---

### 📝 Metadata

- **Title**: ${title}
- **Author**: ${author}
- **Theme**: ${theme}
- **Settings**: ${settings}
${footer ? `- **Footer**: ${footer}` : ""}

---

### 🧾 Full Slide Content

${allSlidesMarkdown}

---

### ✅ Instructions

1. Add appropriate frontmatter block (\`---\`) at the top with:
   - \`marp: true\`
   - \`title\`, \`author\`
   - \`theme\`, \`paginate: true\`, and any custom settings
   - Footer (if provided)
2. Ensure the full content is wrapped inside valid Marp markdown.
3. Do NOT add extra commentary.
4. Format the final result for seamless CLI export via:

   \`\`\`bash
   npx marp slides.md --${exportFormat}
   \`\`\`

---

### 📦 Output Format

Respond ONLY with the complete Marp markdown file inside this block:

\`\`\`md
<final presentation with frontmatter>
\`\`\`

    `.trim();
  }
}
