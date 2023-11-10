const { Pool } = require('pg');
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
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