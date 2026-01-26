import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

export async function POST(req: Request) {
  try {
    const { description, mode } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert ${mode === 'google-sheets' ? 'Google Sheets' : 'Excel'} formula generator.
    Your task is to translate natural language user requests into complex, efficient formulas.
    
    Rules:
    1. Return ONLY the formula. Do not explain. Do not say "Here is the formula".
    2. If the request is unclear, try to generate the most likely formula.
    3. If the request is not related to spreadsheets, return "Error: Please ask for a spreadsheet formula."
    4. Start the formula with =.
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