const pool = require('./pool');

async function getTestInfo() {
    const { rows } = await pool.query('SELECT * FROM test;');
    return rows;
}

async function postUserInfo(username, hash, salt, firstName, lastName) {
    const { rows } =  await pool.query('INSERT INTO users (username, hash, salt, is_member) VALUES ($1, $2, $3, false) RETURNING id',[username, hash, salt]);
    await pool.query('INSERT INTO user_info (user_id, first_name, last_name) VALUES ($1, $2, $3)', [rows[0].id, firstName, lastName])
}

module.exports = {
    getTestInfo,
    postUserInfo,
}