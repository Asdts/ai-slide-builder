export type SlideDetail = 'detailed' | 'medium' | 'minimal';

export function getSlideDetailPrompt(detail: SlideDetail): string {
  switch (detail) {
    case 'detailed':
      return `Extract comprehensive content from the document, preserving all key information and supporting details. Include all major sections and subsections from the source material, maintaining the depth of explanations, examples, data points, and contextual information. Create sufficient slides to accommodate all relevant content without crowding. For each topic in the source document, extract both main points and their supporting evidence or explanations. Ensure visual balance by limiting each slide to 6-8 bullet points or a comparable amount of content. Do not overflow individual slides with too much information or they will go off the slide.`;

    case 'medium':
      return `Extract the most significant information from each section of the document, focusing on main concepts and key supporting details. Select content that represents the core message and essential evidence without including every example or minor point from the source material. Consolidate related information into coherent slides, aiming for comprehensive coverage of major topics while omitting supplementary details. Prioritize information that directly supports the document's main arguments or conclusions. Limit each slide to 4-6 bullet points or a comparable amount of content.`;

    case 'minimal':
      return `Extract only the most essential information from the document, focusing exclusively on key conclusions, main arguments, and critical data points. Select content that communicates the core message in the most concise form possible. Consolidate major sections of the document into a limited number of focused slides. Omit supporting details, examples, and explanations unless absolutely necessary for basic comprehension. Prioritize high-level takeaways over process explanations or contextual information. Limit each slide to 3-4 bullet points or a comparable amount of content.`;

    default:
      return '';
  }
}
