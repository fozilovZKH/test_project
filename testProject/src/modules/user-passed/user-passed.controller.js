const { ResData } = require("../../lib/resData");

class UserPassedController {
  #userPassedService;
  constructor(userPassedService) {
    this.#userPassedService = userPassedService;
  }
  async getAllUserPassed(req, res) {
    const resData = await this.#userPassedService.getAllUserPassed();

    res.status(200).json(resData);
  }
  async getUserPassedById(req, res) {
    try {
      const id = req.params.id;

      const resData = await this.#userPassedService.getUserPassedById(Number(id));

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
      const response = await this.#userPassedService.createUserPassed(req.body);

      res.status(201).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);
      res.status(error.statusCode ?? 500).json(resData);
    }
  }
  async deleteUserPassed(req,res){
    try {
      const Id = req.params?.id;

      const response = await this.#userPassedService.deleteUserPassed(Number(Id));
      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }
}

module.exports = { UserPassedController };
