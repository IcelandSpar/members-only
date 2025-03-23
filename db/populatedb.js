require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255),
hash VARCHAR(255),
salt VARCHAR(255),
is_member VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_info (
user_id INTEGER,
first_name VARCHAR(255),
last_name VARCHAR(255),
UNIQUE(user_id),
CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)

);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER,
title VARCHAR(255),
time_posted VARCHAR(255),
message VARCHAR(255),
CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user_info(user_id)
);
`;


async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.PG_CONNECTION_STRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();