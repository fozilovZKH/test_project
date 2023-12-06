const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
  VariantBadrequestException,
  VariantIdMustBeNumberException,
  VariantNotFoundException,
  QuestionIdNotFoundException,
} = require("./exception/variant.exception.js");
const { generationId } = require("../../lib/generationId.js");
const { Variant } = require("../../lib/variantClass.js");

class VariantService {
  getAllVariant() {
    const variantPath = path.join(__dirname, "../../../database", "variants.json");

    const variantDataSource = new DataSource(variantPath);

    const variants = variantDataSource.read();

    const resData = new ResData("get all variants", 200, variants);

    return resData;
  }

  createVariant(dto) {
    if (!dto || !dto.title || !dto.description) {
      throw new VariantBadrequestException();
    }

    const variantPath = path.join(__dirname, "../../../database", "variants.json");
    const variantDataSource = new DataSource(variantPath);
    const variants = variantDataSource.read()

    const questionPath = path.join(__dirname, "../../../database", "questions.json");
    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read()

    const generatedId = generationId(variants);

    const foundQuestionId = questions.find((question) => question.id === dto.questionId);
    if (!foundQuestionId) {
      throw new QuestionIdNotFoundException();
    }

    const newVariant = new Variant(generatedId, dto.title, dto.description, dto.questionId, dto.iScorrect);

    variants.push(newVariant);

    variantDataSource.write(variants);

    const resData = new ResData("variant created", 201, newVariant);

    return resData;
  }

  updateVariant(dto, variantId) {
    if (!dto || !dto.title || !dto.description) {
      throw new VariantBadrequestException();
    }

    if (isNaN(variantId)) {
      throw new VariantIdMustBeNumberException();
    }

    const { data: foundVariantById } = this.getOneVariantById(variantId);

    foundVariantById.title = dto.title;
    foundVariantById.description = dto.description;
    

    const variantPath = path.join(__dirname, "../../../database", "variants.json");
    const variantDataSource = new DataSource(variantPath);
    const variants = variantDataSource.read();

    const questionPath = path.join(__dirname, "../../../database", "questions.json");
    const questionDataSource = new DataSource(questionPath);
    const questions = questionDataSource.read()

    const foundQuestionId = questions.find((question) => question.id === dto.questionId);
    if (!foundQuestionId) {
      throw new QuestionIdNotFoundException();
    }

    const filterVariants = variants.filter((variant) => variant.id !== foundVariantById.id);

    filterVariants.push(foundVariantById);

    variantDataSource.write(filterVariants);

    const resData = new ResData("update variant", 200, foundVariantById);

    return resData;
  }

  getOneVariantById(variantId) {
    if (isNaN(variantId)) {
      throw new VariantNotFoundException();
    }

    const variantPath = path.join(__dirname, "../../../database", "variants.json");

    const variantDataSource = new DataSource(variantPath);

    const variants = variantDataSource.read();

    const foundVariant = variants.find((variant) => variant.id === variantId);

    if (!foundVariant) {
      throw new VariantNotFoundException();
    }

    const resData = new ResData("found variant by id", 200, foundVariant);

    return resData;
  }

  deleteVariant(variantId) {
    const { data: foundVariantById } = this.getOneVariantById(variantId);

    const variantPath = path.join(__dirname, "../../../database", "variants.json");

    const variantDataSource = new DataSource(variantPath);

    const variants = variantDataSource.read();

    const filterVariants = variants.filter((variant) => variant.id !== foundVariantById.id);

    variantDataSource.write(filterVariants);

    const resData = new ResData("deleted variant", 200, foundVariantById);

    return resData;
  }
}

module.exports = { VariantService };
