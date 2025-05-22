import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = await Promise.resolve(params);
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'samples', name);
    const content = await readFile(filePath, 'utf-8');
    return new NextResponse(content);
  } catch (error) {
    console.error('Error reading file:', error);
    return new NextResponse('Sample not found', { status: 404 });
  }
}