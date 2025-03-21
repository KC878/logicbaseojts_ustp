import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; // ✅ Import RowDataPacket
import db from '../../../lib/database/db'; 
import { addCashierquery, getCashierInfoQuery } from '../../../lib/querries/querries';

// Define a TypeScript interface for Cashier
interface Cashier extends RowDataPacket {  // ✅ Extend RowDataPacket
  name: string;
  shift: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body: { name: string; shift: string };

    try {
      body = await req.json();
    } catch (error) {
      console.error('Invalid JSON format:', error);
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const { name, shift } = body;

    // Validate required fields
    if (!name || !shift) {
      return NextResponse.json({ error: 'Both name and shift are required!' }, { status: 400 });
    }

   
    const [cashiers] = await db.query<Cashier[] & RowDataPacket[]>(getCashierInfoQuery);

    if (!Array.isArray(cashiers)) {
      return NextResponse.json({ error: "Database error: Unable to fetch cashiers" }, { status: 500 });
    }

    // Check if the cashier name already exists
    const existingCashier = cashiers.find(
      (cashier) => cashier.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (existingCashier) {
      return NextResponse.json({ error: 'Cashier name already exists!' }, { status: 409 });
    }

    // Insert new cashier into database
    const [result] = await db.query(addCashierquery, [name, shift]);

    return NextResponse.json({ message: "Cashier added successfully!", result }, { status: 201 });

  } catch (error) {
    console.log('Database Error:', error);
    return NextResponse.json({ error: "Failed to add cashier" }, { status: 500 });
  }
}
