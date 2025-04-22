export type Audience =
  | 'general'
  | 'academic'
  | 'technical'
  | 'professional'
  | 'executive';

export function getAudiencePrompt(audience: Audience): string {
  switch (audience) {
    case 'general':
      return `Format the presentation for a general audience with varying levels of background knowledge. Select the clearest and most accessible language from the document. When technical terms appear in the source, include brief definitions from the document when available. Prioritize content from the document that explains broader context and significance. Organize the extracted information as a narrative when possible, with a clear beginning, middle, and end. Format slides with minimal text and emphasize any visual elements from the original document.`;

    case 'academic':
      return `Format the presentation for an academic audience. Select terminology and detailed explanations from the document that preserve methodological details and theoretical frameworks. When extracting content, maintain the document's original citations, methodologies, and nuanced points. Preserve the logical structure of arguments found in the source material. When organizing information from the document, maintain appropriate context for all extracted data and findings. Format slides to balance detailed information with clarity.`;

    case 'technical':
      return `Format the presentation for a technical audience. Preserve technical terminology, specifications, and detailed explanations from the document. Prioritize content that focuses on implementation details, methodologies, and technical processes described in the source material. When extracting diagrams or code examples from the document, include the relevant explanatory text. Maintain the technical depth and precision of the source material. Organize the content in a logical sequence that preserves technical relationships and dependencies described in the document.`;

    case 'professional':
      return `Format the presentation for business professionals. Select terminology and concepts from the document that highlight practical applications and business relevance. Prioritize content from the document that demonstrates actionable insights, case studies, and results. Organize the extracted information with an emphasis on takeaways and strategic implications. Format slide content with concise bullet points rather than dense paragraphs. When selecting information from charts or data in the document, focus on metrics and trends most relevant to business decisions.`;

    case 'executive':
      return `Format the presentation for executive decision-makers. Select high-level information from the document that focuses on strategic implications and business impact. Prioritize content related to outcomes, ROI, and competitive advantages mentioned in the source material. Extract summary information rather than operational details unless specifically relevant to executive decisions. When selecting information from the document, focus on big-picture insights and key recommendations. Format slides with concise headline statements that capture the essential points from the document.`;

    default:
      return '';
  }
}
