const { ResData } = require("../../lib/resData");

class VariantController {
  #variantService;
  constructor(variantService) {
    this.#variantService = variantService;
  }

  async getAllVariant(req, res) {
    const resData = await this.#variantService.getAllVariant();

    res.status(200).json(resData);
  }

  async createVariant(req, res) {
    try {
      const resData = await this.#variantService.createVariant(req.body);

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

  async getOneVariantById(req, res) {
    try {
      const variantId = req.params.id;

      const resData = await this.#variantService.getOneVariantById(Number(variantId));

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

  async updateVariant(req, res) {
    try {
      const variantId = req.params.id;
      const dto = req.body;

      const resData = await this.#variantService.updateVariant(dto, Number(variantId));

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

  async deleteVariant(req, res) {
    try {
      const variantId = req.params.id;

      const resData = await this.#variantService.deleteVariant(Number(variantId));

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

module.exports = { VariantController };
