'use server';

import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

export async function POST(req: Request) {
    const body = await req.json();
    const conn = await pool.getConnection();
    const data = await conn.query(body.query);
    conn.release();
    let response;

    try {
        if (body.queryonly == false) {
            response = JSON.stringify(data);
        } else {
            response = JSON.stringify([]);
        }
    } catch (error) {
        response = JSON.stringify([]);
        console.log(`FYI an error was caught -> ${error}`);
    }

    return new Response(response, {
        headers: { 'Content-Type': 'application/json' },
    });
}
