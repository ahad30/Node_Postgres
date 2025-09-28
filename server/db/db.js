const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB connection error:", err.stack));

module.exports = pool;
