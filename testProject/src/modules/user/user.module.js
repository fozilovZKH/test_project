const { Router } = require("express");
const router = Router();
const { UserController } = require("./user.controller.js");
const { UserService } = require("./user.service.js");


const userService = new UserService();
const userController = new UserController(userService);

router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

router.post("/", (req, res) => {
  userController.createUser(req, res);
});

router.put("/:id", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = { router };
