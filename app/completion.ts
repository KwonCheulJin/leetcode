import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI();

/**
 * API 응답 유효성 검증
 * @param response - OpenAI API 응답
 * @returns 유효성 검증 결과
 */
export function validateApiResponse(response: OpenAI.Chat.Completions.ChatCompletion): boolean {
  return !!(
    response?.choices?.[0]?.message?.content &&
    response.choices[0].message.content.trim().length > 0
  );
}

export const completion = async (content: string): Promise<OpenAI.Chat.Completions.ChatCompletion> =>
  await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a translator. Translate the following text from English to Korean.',
      },
      {
        role: 'user',
        content,
      },
    ],
  });