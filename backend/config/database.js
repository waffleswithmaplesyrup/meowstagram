const Pool = require("pg").Pool;

const options = {
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE_DB,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: true
};

const pool = new Pool(options);

module.exports = pool;