import { NextResponse } from 'next/server';


import db from '../../../lib/database/db'; // Adjust import 

import { getPaymentMethods } from '@src/lib/querries/querries';




export async function GET(){
  try{
     
  const [paymentMethods] = await db.query(getPaymentMethods);

    return NextResponse.json(paymentMethods, {status: 200});
  }catch(error){
    return NextResponse.json({error: error}, {status: 500});
  }
}