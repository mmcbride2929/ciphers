const db = require("../config/db")

const getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users"
    const users = await db.query(query)
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ message: "Error fetching users" })
  }
}

const getUser = async (req, res) => {
  const userId = req.params.id
  try {
    const query = "SELECT * FROM users WHERE id = $1"
    const user = await db.query(query, [userId])
    res.status(200).send(user.rows[0])
  } catch (error) {
    res.status(400).send({ message: "Error fetching users" })
  }
}

const addUser = async (req, res) => {
  const { id, name, email, photo_url } = req.body

  const checkUserQuery = "SELECT * FROM users WHERE id = $1"
  const checkUserResult = await db.query(checkUserQuery, [id])

  if (checkUserResult.rowCount === 0) {
    try {
      const insertUserQuery = `INSERT INTO users (name, email, id, "photo_url") VALUES ($1, $2, $3, $4) RETURNING *`
      const insertUserResult = await db.query(insertUserQuery, [
        name,
        email,
        id,
        photo_url,
      ])

      const newUser = insertUserResult.rows[0]

      if (insertUserResult.rowCount === 1) {
        res
          .status(200)
          // send user back
          .send(newUser)
      }
    } catch (error) {
      console.log(error.message)
      res.status(400).send({ message: "Error creating user" })
    }
  } else {
    const existingUser = checkUserResult.rows[0]
    res
      .status(200)
      // send user back
      .send(existingUser)
  }
}

module.exports = { getUsers, getUser, addUser }
