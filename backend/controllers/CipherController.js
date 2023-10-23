const db = require("../config/db")

const getCiphers = async (req, res) => {
  try {
    const query = `SELECT ciphers.*, users.name, users.photo_url
    FROM ciphers
    INNER JOIN users ON ciphers.author = users.id
    ORDER BY ciphers.created_at DESC`

    const ciphers = await db.query(query)
    res.status(200).send(ciphers)
  } catch (error) {
    res.status(400).send({ message: "Error fetching ciphers" })
  }
}

const addCipher = async (req, res) => {
  const { author, content } = req.body

  if (content.length < 26) {
    try {
      const insertQuery =
        "INSERT INTO ciphers (author, content, created_at) VALUES ($1, $2, NOW())"
      const cipher = await db.query(insertQuery, [author, content])

      res
        .status(200)
        .send({ message: `Cipher from ${author} has been created` })
    } catch (error) {
      console.log(error.message)
      res.status(400).send({ message: "Error adding cipher" })
    }
  } else {
    res
      .status(400)
      .send({ message: "Message too long, make sure its under 25 characters" })
  }
}

const deleteCipher = async (req, res) => {
  const { author, contentid } = req.body

  try {
    const deleteQuery =
      "DELETE FROM ciphers WHERE contentid = $1 AND author = $2"
    const result = await db.query(deleteQuery, [contentid, author])
    res.status(200).send({
      message: `Post ${contentid} from ${author} has been deleted successfully`,
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).send({ message: "Cipher could not be deleted" })
  }
}

const guessCipher = async (req, res) => {
  const { userGuess, name, id } = req.body
  const contentid = req.params.id

  try {
    const guessQuery =
      "SELECT content, attempts FROM ciphers WHERE contentid = $1"

    const response = await db.query(guessQuery, [contentid])

    const contentAndGuesses = response.rows[0]
    if (contentAndGuesses.content === userGuess) {
      // CIPHERS update attempts, solved_by
      const solvedQuery = `
      UPDATE ciphers
      SET attempts = attempts + 1, solved_by = $2
      WHERE contentid = $1;
    `
      await db.query(solvedQuery, [contentid, name])

      // USERS solvedCiphers +1
      const updateUserQuery = `
      UPDATE users
      SET "solvedCiphers" = "solvedCiphers" + 1
      WHERE id = $1;
    `
      await db.query(updateUserQuery, [id])

      res.status(200).send(true)
    } else if (contentAndGuesses.content !== userGuess) {
      const unsolvedQuery = `
      UPDATE ciphers
      SET attempts = attempts + 1
      WHERE contentid = $1;
    `
      await db.query(unsolvedQuery, [contentid])

      res.status(200).send(false)
    }
  } catch (error) {
    res.status(400).send("it caught")
    console.log(error.message)
  }
}

module.exports = { getCiphers, addCipher, deleteCipher, guessCipher }
