require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE test (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255)
);

INSERT INTO test (username) VALUES ('Tom'),( 'Nook'), ('Jerry');
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