const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
  async connect() {
    const client = await pool.connect();
    return client;
  },
};
