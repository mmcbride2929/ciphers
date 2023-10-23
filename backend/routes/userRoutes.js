const express = require("express")

const userController = require("../controllers/UserController")

const router = express.Router()

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.addUser)

router.route("/:id").get(userController.getUser)

module.exports = router
