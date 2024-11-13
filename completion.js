import OpenAI from 'openai';
const openai = new OpenAI();

export const completion = async content =>
  await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are a translator. Translate the following text from English to Korean.',
      },
      {
        role: 'user',
        content,
      },
    ],
  });
