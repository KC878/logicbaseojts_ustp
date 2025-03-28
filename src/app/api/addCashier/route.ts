import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; // ✅ Import RowDataPacket
import db from '../../../lib/database/db';
import { addCashierquery, getCashiers } from '../../../lib/querries/querries';

// Define a TypeScript interface for Cashier
interface Cashier extends RowDataPacket {
  name: string;
  shift: string[];
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body: Cashier;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON format:", error);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { name, shift, startDate, endDate, status } = body;

    const arrCashierInfo = [name, shift, startDate, endDate, status];

    const messageRequired = [
      "Name is required",
      "Shift is required",
      "Start date is required",
      "End date is required",
      "Status is required",
    ];

    // 🚨 Validate required fields
    for (let index = 0; index < arrCashierInfo.length; index++) {
      if (arrCashierInfo[index] === null || arrCashierInfo[index] === undefined || arrCashierInfo[index] === '') {
        console.log('This', name);
        console.log(`Error 400: ${messageRequired[index]}`);
        return NextResponse.json({ error: messageRequired[index] }, { status: 400 });
      }
    }

    // 🚨 Validate and parse dates correctly
    const formattedStartDate = startDate ? new Date(startDate) : null;
    const formattedEndDate = endDate ? new Date(endDate) : null;

    if (!formattedStartDate || isNaN(formattedStartDate.getTime())) {
      return NextResponse.json({ error: "Invalid start date format" }, { status: 400 });
    }

    if (!formattedEndDate || isNaN(formattedEndDate.getTime())) {
      return NextResponse.json({ error: "Invalid end date format" }, { status: 400 });
    }

    console.log("Validated Start Date:", formattedStartDate);
    console.log("Validated End Date:", formattedEndDate);

    // Fetch existing cashiers
    const [cashiers] = await db.query<Cashier[] & RowDataPacket[]>(getCashiers);
    if (!Array.isArray(cashiers)) {
      return NextResponse.json({ error: "Database error: Unable to fetch cashiers" }, { status: 500 });
    }

    // 🚨 Ensure `shift` is an array and join it into a string
    if (!Array.isArray(shift)) {
      return NextResponse.json({ error: "Shift must be an array" }, { status: 400 });
    }
    shift.sort(); // Sort alphabetically for display consistency
    const shifts = shift.join(", ");
    console.log("Formatted Shift:", shifts);

    // Convert status to integer for database
    const isActive = status ? 1 : 0;

    // 🚨 Ensure valid date format before inserting
    const formattedStart = formattedStartDate.toISOString().slice(0, 10);
    const formattedEnd = formattedEndDate.toISOString().slice(0, 10);

    // Insert new cashier into the database
    const [result] = await db.query(addCashierquery, [name, shifts, formattedStart, formattedEnd, isActive]);

    return NextResponse.json({ message: "Cashier added successfully!", result }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to add cashier" }, { status: 500 });
  }
}
