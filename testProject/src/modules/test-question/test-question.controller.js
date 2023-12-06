const { ResData } = require("../../lib/resData.js");

 class TestQuestionController {
  #testQuestionService;
  constructor(testQuestionService) {
    this.#testQuestionService = testQuestionService;
  }
  async getAllTestQuestion(req, res) {
    const resData = await this.#testQuestionService.getAllTestQuestion();

    res.status(200).json(resData);
  }
  async getTestQuestionById(req, res) {
    try {
      const id = req.params.id;

      const resData = await this.#testQuestionService.getTestQuestionById(Number(id));

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
  async createUserPassed(req, res) {
    try {
      const response = await this.#testQuestionService.createUserPassed(req.body);

      res.status(201).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);
      res.status(error.statusCode ?? 500).json(resData);
    }
  }
  async deleteTestQuestion(req,res){
    try {
      const Id = req.params?.id;

      const response = await this.#testQuestionService.deleteTestQuestion(Number(Id));
      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }
}

module.exports = {TestQuestionController}
