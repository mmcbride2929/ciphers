const express = require("express")
const dotenv = require("dotenv").config()
const PGPORT = process.env.PGPORT
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes.js")
const cipherRoutes = require("./routes/cipherRoutes.js")

// initiating app
const app = express()

// middleware
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.use("/users", userRoutes)

// routes
app.use("/ciphers", cipherRoutes)

app.listen(PGPORT, () => {
  console.log(`running on port ${PGPORT}`)
})
