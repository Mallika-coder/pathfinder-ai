import { NextRequest, NextResponse } from 'next/server';
import { analyzeLane } from '../../../lib/geminiAnalyzer';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();
    const analysis = await analyzeLane(imageBase64);
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}