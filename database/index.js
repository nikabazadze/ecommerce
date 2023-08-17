const Pool = require('pg').Pool
const pool = new Pool();

const query = async (text, params) => {
    const start = Date.now();
    const response = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: response.rowCount });
    return response;
};

module.exports = {query};