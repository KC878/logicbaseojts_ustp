import { NextResponse } from 'next/server';
import db from '../../../../lib/database/db'; // Adjust import 

import { getCashiersName } from '../../../../lib/querries/querries'



export async function GET(){
  try{
    const [rows] = await db.query(getCashiersName);
    
    return NextResponse.json(rows, {status: 200});
  }catch(error){
    return NextResponse.json({error: error}, {status: 500});
  }
}