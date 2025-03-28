const pool = require('./pool');

async function getIndexMessages() {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY messages.id DESC');
    return rows;
}

async function postUserInfo(username, hash, salt, firstName, lastName) {
    const { rows } =  await pool.query('INSERT INTO users (username, hash, salt, is_member) VALUES ($1, $2, $3, false) RETURNING id',[username, hash, salt]);
    await pool.query('INSERT INTO user_info (user_id, first_name, last_name) VALUES ($1, $2, $3)', [rows[0].id, firstName, lastName])
}

async function postNewMessage(userId, title, timePosted, message) {
    await pool.query('INSERT INTO messages (user_id, title, time_posted, message) VALUES ($1, $2, $3, $4)', [userId, title, timePosted, message]);
}



module.exports = {
    getIndexMessages,
    postUserInfo,
    postNewMessage,
}