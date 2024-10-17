import { NextResponse } from 'next/server';

// This is a dynamic route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const response = await fetch(`${process.env.API_URL}/api/hello`);
  
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data from Rails API' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}