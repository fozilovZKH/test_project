const { Router } = require("express");
const router = Router();
const { VariantController } = require("./variant.controller.js");
const { VariantService } = require("./variant.service.js");

const variantService = new VariantService();
const variantController = new VariantController(variantService);

router.get("/", (req, res) => {
  variantController.getAllVariant(req, res);
});

router.get("/:id", (req, res) => {
  variantController.getOneVariantById(req, res);
});

router.post("/", (req, res) => {
  variantController.createVariant(req, res);
});

router.put("/:id", (req, res) => {
  variantController.updateVariant(req, res);
});

router.delete("/:id", (req, res) => {
  variantController.deleteVariant(req, res);
});

module.exports = { router };
