const { ResData } = require("../../lib/resData");

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getUserById(req, res) {
    try {
      const userId = req.params?.id;

      const response = await this.#userService.userFindById(Number(userId));

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  async getAllUsers(req, res) {
    try {
      const response = await this.#userService.userGetAll();

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  async createUser(req, res) {
    try {
      const { login, password, fullName, birthdate, role } = req.body;
      if (!fullName || !login || !password || !birthdate || !role) {
        const resData = new ResData("fullName, login, password, birthdate and role must be require!");

        return res.status(400).json(resData);
      }

      const response = await this.#userService.createUser(req.body);

      res.status(201).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  async updateUser(req,res){
    try {
      const userId = req.params?.id;

      const response = await this.#userService.updateUser(req.body,Number(userId));
      const { login, password, fullName, birthdate, role } = req.body;
      if (!fullName || !login || !password || !birthdate || !role) {
        const resData = new ResData("fullName, login, password, birthdate and role must be require!");

        return res.status(400).json(resData);
      }

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  async deleteUser(req,res){
    try {
      const userId = req.params?.id;

      const response = await this.#userService.deleteUser(Number(userId));

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData); 
    }
  }
}

module.exports = { UserController };
