const express = require("express")

const cipherController = require("../controllers/CipherController")

const router = express.Router()

router
  .route("/")
  .get(cipherController.getCiphers)
  .post(cipherController.addCipher)
  .delete(cipherController.deleteCipher)

router.route("/:id").post(cipherController.guessCipher)

module.exports = router
