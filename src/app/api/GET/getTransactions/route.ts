import { NextResponse } from 'next/server';
import db from '../../../../lib/database/db';
import { getTransactions } from '../../../../lib/querries/querries';

export async function GET() {
  try {
    const [rows] = await db.query(getTransactions);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error },  // ✅ Corrected typo
      { status: 500 }
    );
  }
}
