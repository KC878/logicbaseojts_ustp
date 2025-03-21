import { NextResponse } from 'next/server';
import db from '../../../lib/database/db';
import { getShortOverPos } from '../../../lib/querries/querries';


export async function GET(){
  try{
    const [rows] = await db.query(getShortOverPos);

    return NextResponse.json(rows, {status: 200});
  }catch(error){
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}