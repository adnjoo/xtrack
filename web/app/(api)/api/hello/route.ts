import { NextResponse } from 'next/server';
import { API_URL } from '@/components/Login';

export async function GET(request: Request) {
  const response = await fetch(`${API_URL}/api/hello`);
  
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data from Rails API' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}