/*
 * Extracts the markdown content wrapped inside triple backticks from agent response.
 * Supports optional language specifier like ```md.
 *
 * @param rawResponse - The raw string returned by the agent
 * @returns The extracted markdown content, or null if not found
 * Created by asdts
 */
export function extractMarkdown(rawResponse: string): string | null {
    const match = rawResponse.match(/```(?:md)?\\n?([\s\S]*?)```/);
    // console.log(match)
    return match ? match[1].trim() : null;
  }
  