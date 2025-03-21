// app/api/example/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "GET request received" });
}

export async function POST(request) {
  const data = await request.json();
  return NextResponse.json({ message: "POST request received", data });
}

export async function PUT(request) {
  return NextResponse.json({ message: "PUT request received" });
}

export async function DELETE() {
  return NextResponse.json({ message: "DELETE request received" });
}
