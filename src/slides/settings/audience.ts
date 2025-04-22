export type Audience =
  | 'general'
  | 'academic'
  | 'technical'
  | 'professional'
  | 'executive';

export function getAudiencePrompt(audience: Audience): string {
  switch (audience) {
    case 'general':
      return `Write in simple, accessible language that a general audience can understand. Avoid jargon. Include examples and define any necessary terms. Use a clear and engaging tone.`;

    case 'academic':
      return `Use formal academic language with accurate terminology. Present structured arguments and include references to theories, frameworks, or research studies where appropriate.`;

    case 'technical':
      return `Use precise technical terminology. Explain systems, methods, and processes with depth. Include implementation details, architecture, and relevant code or technical diagrams where appropriate.`;

    case 'professional':
      return `Use concise business language. Emphasize applications, results, and case studies. Highlight actionable insights and practical implications for professionals.`;

    case 'executive':
      return `Use clear, high-level language aimed at decision-makers. Focus on strategy, business impact, ROI, and recommendations. Use concise statements with a results-driven tone.`;

    default:
      return '';
  }
}
