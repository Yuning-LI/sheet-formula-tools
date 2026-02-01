import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const description =
      typeof body?.description === 'string' ? body.description.trim() : '';
    const mode = body?.mode === 'google-sheets' ? 'google-sheets' : 'excel';

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert ${mode === 'google-sheets' ? 'Google Sheets' : 'Excel'} formula generator.
Your task is to translate natural language user requests into accurate, efficient formulas.

Rules:
1. Return ONLY the formula or the exact error code. Do not explain.
2. If the request is not a spreadsheet formula request, return !ERROR: INVALID_INPUT.
3. If the request is unclear but still a formula request, generate the most likely formula.
4. Start formulas with =.
5. Prefer standard, older Excel-compatible functions unless the user explicitly asks for newer functions.
`;

    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description }
      ],
      model: "deepseek-chat", 
      temperature: 0.1, 
    });

    const formula = completion.choices[0].message.content;

    return NextResponse.json({ formula });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate formula' },
      { status: 500 }
    );
  }
}
