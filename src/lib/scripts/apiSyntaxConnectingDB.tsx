// app/api/example/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Default PostgreSQL port
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users'); // Fetch data
    client.release();

    return NextResponse.json({ message: "GET request received", data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    
    const client = await pool.connect();
    await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]); // Insert data
    client.release();

    return NextResponse.json({ message: "User added successfully", user: { name, email } });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, email } = await request.json();

    const client = await pool.connect();
    await client.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, id]); // Update data
    client.release();

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const client = await pool.connect();
    await client.query('DELETE FROM users WHERE id=$1', [id]); // Delete data
    client.release();

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}
