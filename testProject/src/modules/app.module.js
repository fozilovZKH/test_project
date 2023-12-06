const { Router } = require("express");
const router = Router();
const test = require("./test/test.module.js");
const question = require("./question/question.module.js");
const variant = require("./variants/variant.module.js");
const user = require("./user/user.module.js");
const testQuestion = require("./test-question/test-question.module.js");
const userPassed = require("./user-passed/user-passed.module.js");

router.use("/test", test.router);
router.use("/question", question.router);
router.use("/variant", variant.router);
router.use("/user", user.router);
router.use("/test-question", testQuestion.router);
router.use("/user-passed", userPassed.router);

module.exports = { router };
