import { NextResponse } from 'next/server';
import db from '../../../lib/database/db'; // Adjust import 

import { getCashierInfoQuery } from '../../../lib/querries/querries'



export async function GET(){
  try{
    const [rows] = await db.query(getCashierInfoQuery);

    return NextResponse.json(rows, {status: 200});
  }catch(error){
    return NextResponse.json({error: error.message}, {status: 500});
  }
}