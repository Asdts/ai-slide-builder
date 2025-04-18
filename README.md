# 📊 AI Slide Builder

An AI-assisted, editable, slide-by-slide presentation generator built using Gemini 2.0 Flash and rendered with MARP (Markdown Presentation Ecosystem). Design beautiful, dynamic presentations powered by natural language prompts — edit, regenerate, and style every element with ease.

—

🚀 Features

- 🧠 Generate full presentations from a single prompt
- 🔁 Slide-by-slide generation with context-aware summaries
- ✍️ Per-slide editing and regeneration using prompts
- ✂️ Select text and rewrite with AI via prompt
- ➕ Insert basic elements: image, table, video, code, text
- 🎨 Custom styling: border, padding, alignment, font
- 🖼 Live MARP preview and markdown editing
- 📤 Export to PDF or PPTX using marp-cli

—

🧱 Tech Stack

| Layer           | Technology                  |
|----------------|-----------------------------|
| Frontend        | Next.js 14 (App Router)     |
| LLM Integration | Gemini 2.0 Flash API        |
| Markdown Engine | @marp-team/marp-core        |
| State Mgmt      | Zustand / React Context     |
| Styling         | Tailwind CSS                |
| Editor          | React Markdown / MDE Editor |
| Backend (opt)   | Firebase / Supabase / API Routes |
| Export Engine   | marp-cli                    |

—

✨ Getting Started

1. Clone the repo

git clone https://github.com/yourusername/ai-slide-builder.git
cd ai-slide-builder

2. Install dependencies

npm install

3. Setup environment variables

.env.local:

GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongo_uri

4. Run locally

npm run dev

5. (Optional) Setup marp-cli for export:

npm install -g @marp-team/marp-cli

—

🧠 Prompt Context Flow

Every slide generation request includes:

- Original user prompt
- Summaries of previous slides
- Current slide’s content (if editing)
- Optional: User’s per-slide edit prompt

This enables Gemini to generate or revise content contextually and intelligently.

—

📤 Exporting Slides

Slides are rendered in MARP markdown and can be exported using marp-cli:

npx marp slides.md --pdf  
npx marp slides.md --pptx

—

📌 Future Improvements

- Slide reordering and drag-and-drop UI
- AI-assisted outline generation and batch slide creation
- Templates and themes for visual polish
- Real-time collaboration (Liveblocks / Firebase)

—

📄 License

MIT License. Feel free to fork, contribute, and innovate.
