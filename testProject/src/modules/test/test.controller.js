const { ResData } = require("../../lib/resData");

class TestController {
  #testService;
  constructor(testService) {
    this.#testService = testService;
  }

  async getAllTest(req, res) {
    const resData = await this.#testService.getAllTest();

    res.status(200).json(resData);
  }

  async createTest(req, res) {
    try {
      const resData = await this.#testService.createTest(req.body);

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

  async getOneTestById(req, res) {
    try {
      const testId = req.params.id;

      const resData = await this.#testService.getOneTestById(Number(testId));

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

  async updateTest(req, res) {
    try {
      const testId = req.params.id;
      const dto = req.body;

      const resData = await this.#testService.updateTest(dto, Number(testId));

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

  async deleteTest(req, res) {
    try {
      const testId = req.params.id;

      const resData = await this.#testService.deleteTest(Number(testId));

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
}

module.exports = { TestController };
