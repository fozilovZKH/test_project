const { Router } = require("express");
const router = Router();
const { TestQuestionController } = require("./test-question.controller.js");
const { TestQuestionService } = require("./test-question.service.js");

const testQuestionService = new TestQuestionService();
const testQuestionController = new TestQuestionController(testQuestionService);

router.get("/", (req, res) => {
  testQuestionController.getAllTestQuestion(req, res);
});

router.get("/:id", (req, res) => {
  testQuestionController.getTestQuestionById(req, res);
});

router.post("/", (req, res) => {
  testQuestionController.createTestQuestion(req, res);
});

router.delete("/:id", (req, res) => {
  testQuestionController.deleteTestQuestion(req, res);
});

module.exports = { router };
