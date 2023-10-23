const { Client } = require("pg")

const client = new Client({
  // HOST: "localhost",
  // PORT: 5432,
  // database: 'postgres',
  // user: 'postgres',
  // password: 'admin123'
  DATABASE_URL: process.env.DATABASE_URL,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
  PGUSER: process.env.PGUSER,
})

client.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("connected")
  }
})

module.exports = client
