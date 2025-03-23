const pool = require('./pool');

async function getTestInfo() {
    const { rows } = await pool.query('SELECT * FROM test;');
    return rows;
}


module.exports = {
    getTestInfo,
}