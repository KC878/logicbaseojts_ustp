import { NextResponse } from 'next/server';
import db from '../../../lib/database/db'; 
import { addCashierquery, getCashierInfoQuery } from '../../../lib/querries/querries';

export async function POST(req) {
  try {
    let body;
    
    // Ensure request body is valid JSON
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { name, shift } = body;

    // Validate required fields
    if (!name || !shift) {
      return NextResponse.json(
        { error: 'Empty Fields!' },
        { status: 400 }
      );
    }

    // Fetch existing cashiers
    const [cashiers] = await db.query(getCashierInfoQuery);
    console.log("Cashier records:", cashiers);

    if (!Array.isArray(cashiers)) {
      return NextResponse.json(
        { error: "Database error: Unable to fetch cashiers" },
        { status: 500 }
      );
    }

    // Check if the cashier name already exists
    const existingCashier = cashiers.find(
      cashier => cashier.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (existingCashier) {
      return NextResponse.json(
        { error: 'Name already exists!' },
        { status: 409 }
      );
    }

    // Insert new cashier into database
    const [res] = await db.query(addCashierquery, [name, shift]);
    console.log("Insert result:", res);

    return NextResponse.json({
      message: "Cashier added successfully!",
      result: res
    });

  } catch (error) {
    console.error("Database Error: ", error);
    return NextResponse.json(
      { error: "Failed to add cashier" },
      { status: 500 }
    );
  }
}
