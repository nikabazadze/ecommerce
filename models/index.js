const fs = require('fs');
const { Pool } = require('pg');
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./config/us-east-1-bundle.pem').toString()
    }
};

const pool = new Pool(dbConfig);

const query = async (text, params) => {
    const start = Date.now();
    const response = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: response.rowCount });
    return response;
};

module.exports = {query, pool};