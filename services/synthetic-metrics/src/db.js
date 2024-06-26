const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME ||'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_NAME ||'health',
  password: process.env.POSTGRES_PASSWORD || '94416',
  port: process.env.POSTGRES_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
