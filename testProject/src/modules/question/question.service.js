const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
  QuestionBadrequestException,
  QuestionIdMustBeNumberException,
  QuestionNotFoundException,
} = require("./exception/question.exception.js");
const { generationId } = require("../../lib/generationId.js");
const { Question } = require("../../lib/questionClass.js");

class QuestionService {
  getAllQuestion() {
    const questionPath = path.join(__dirname, "../../../database", "questions.json");

    const questionDataSource = new DataSource(questionPath);

    const questions = questionDataSource.read();

    const resData = new ResData("get all questions", 200, questions);

    return resData;
  }

  createQuestion(dto) {
    if (!dto || !dto.title) {
      throw new QuestionBadrequestException();
    }

    const questionPath = path.join(__dirname, "../../../database", "questions.json");

    const questionDataSource = new DataSource(questionPath);

    const questions = questionDataSource.read();

    const generatedId = generationId(questions);

    const newQuestion = new Question(generatedId, dto.title);

    questions.push(newQuestion);

    questionDataSource.write(questions);

    const resData = new ResData("question created", 201, newQuestion);

    return resData;
  }

  updateQuestion(dto, questionId) {
    if (!dto || !dto.title) {
      throw new QuestionBadrequestException();
    }

    if (isNaN(questionId)) {
      throw new QuestionIdMustBeNumberException();
    }

    const { data: foundQuestionById } = this.getOneQuestionById(questionId);

    foundQuestionById.title = dto.title;

    const questionPath = path.join(__dirname, "../../../database", "questions.json");

    const questionDataSource = new DataSource(questionPath);

    const questions = questionDataSource.read();

    const filterQuestions = questions.filter((question) => question.id !== foundQuestionById.id);

    filterQuestions.push(foundQuestionById);

    questionDataSource.write(filterQuestions);

    const resData = new ResData("update question", 200, foundQuestionById);

    return resData;
  }

  getOneQuestionById(questionId) {
    if (isNaN(questionId)) {
      throw new QuestionIdMustBeNumberException();
    }

    const questionPath = path.join(__dirname, "../../../database", "questions.json");

    const questionDataSource = new DataSource(questionPath);

    const questions = questionDataSource.read();

    const foundQuestion = questions.find((question) => question.id === questionId);

    if (!foundQuestion) {
      throw new QuestionNotFoundException();
    }

    const resData = new ResData("found question by id", 200, foundQuestion);

    return resData;
  }

  deleteQuestion(questionId) {
    const { data: foundQuestionById } = this.getOneQuestionById(questionId);

    const questionPath = path.join(__dirname, "../../../database", "questions.json");

    const questionDataSource = new DataSource(questionPath);

    const questions = questionDataSource.read();

    const filterQuestions = questions.filter((question) => question.id !== foundQuestionById.id);

    questionDataSource.write(filterQuestions);

    const resData = new ResData("deleted question", 200, foundQuestionById);

    return resData;
  }
}

module.exports = { QuestionService };
