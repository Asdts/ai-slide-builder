export type SlideDetail = 'detailed' | 'medium' | 'minimal';

export function getSlideDetailPrompt(detail: SlideDetail): string {
  switch (detail) {
    case 'detailed':
      return `Create a comprehensive slide deck covering the topic in depth. Include all key themes, relevant subtopics, explanations, examples, and real-world data points where applicable. Use 6–8 bullet points per slide, and generate as many slides as needed to fully cover the topic. Avoid crowding any slide with excessive content.`;

    case 'medium':
      return `Create a slide deck that captures the most important aspects of the topic. Focus on key themes, main points, and supporting evidence. Use 4–6 bullet points per slide. Group related ideas together and aim for a balanced number of slides. Leave out minor or overly detailed points.`;

    case 'minimal':
      return `Create a concise slide deck that presents only the most essential information on the topic. Focus on high-level insights, conclusions, and critical takeaways. Use 3–4 bullet points per slide. Generate a limited number of slides that provide a quick overview without deep detail.`;

    default:
      return '';
  }
}
