const { Router } = require("express");
const router = Router();
const { UserPassedController } = require("./user-passed.controller.js");
const { UserPassedService } = require("./user-passed.service.js");

const userPassedService = new UserPassedService();
const userPassedController = new UserPassedController(userPassedService);

router.get("/", (req, res) => {
  userPassedController.getAllUserPassed(req, res);
});

router.get("/:id", (req, res) => {
  userPassedController.getUserPassedById(req, res);
});

router.post("/", (req, res) => {
  userPassedController.createUserPassed(req, res);
});

router.delete("/:id", (req, res) => {
  userPassedController.deleteUserPassed(req, res);
});

module.exports = { router };
