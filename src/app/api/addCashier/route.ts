import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; // ✅ Import RowDataPacket
import db from '../../../lib/database/db'; 
import { addCashierquery, getCashiers } from '../../../lib/querries/querries';

// Define a TypeScript interface for Cashier
interface Cashier extends RowDataPacket {  // ✅ Extend RowDataPacket
  name: string;
  shift: string;
  startDate: Date;
  endDate: Date;
  isActive: Boolean
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body: Cashier
    try {
      body = await req.json();
    } catch (error) {
      console.error('Invalid JSON format:', error);
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const { name, shift, startDate, endDate, isActive } = body;
    
    const arrCashierInfo = [ name, shift, startDate, endDate, isActive];

    const messageRequired = [
      'Name is required',
      'Shift it required',
      'Start date is required',
      'End date is required',
      'Status is required'
    ];

    for(let index = 0; index < arrCashierInfo.length; index++) {
      if (arrCashierInfo[index] === null || arrCashierInfo[index] === undefined) {
        return NextResponse.json(
          { error: messageRequired[index]},
          { status: 400 }
        )
      }
    }; // check empty fields

    console.log(shift);
    // convert to Date Objects

    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate); // convert to date object
    
    console.log(formattedEndDate.getTime())

    // Validate required fields
    
    const [cashiers] = await db.query<Cashier[] & RowDataPacket[]>(getCashiers);

    if (!Array.isArray(cashiers)) {
      return NextResponse.json({ error: "Database error: Unable to fetch cashiers" }, { status: 500 });
    }

    // Insert new cashier into database
    const [result] = await db.query(addCashierquery, [
      name, 
      shift, 
      formattedStartDate.toISOString().slice(0, 10), 
      formattedEndDate.toISOString().slice(0, 10), 
      isActive
    
    ]);

    return NextResponse.json({ message: "Cashier added successfully!", result }, { status: 201 });

  } catch (error) {
    console.log('Database Error:', error);
    return NextResponse.json({ error: "Failed to add cashier" }, { status: 500 });
  }
}
