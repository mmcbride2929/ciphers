const { Client } = require("pg")

const client = new Client({
  // HOST: "localhost",
  // PORT: 5432,
  // database: 'postgres',
  // user: 'postgres',
  // password: 'admin123'
  PGHOST: process.env.DB_HOST,
  PGPORT: process.env.DB_PORT,
  PGDATABASE: process.env.DB_NAME,
  PGUSER: process.env.DB_USER,
  PGPASSWORD: process.env.DB_PASSWORD,
})

client.connect((err) => {
  if (err) {
    console.log("error connecting to the database")
  } else {
    console.log("connected")
  }
})

module.exports = client
