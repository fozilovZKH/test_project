const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");

const {
    TestIdQuestionIdRequiresException,
    TestHasQuestionException,
    TestQuestionIdMustBeNumberException,
    TestNotFoundException,
    QuestionNotFound
  } = require("./exception/test-question.exception.js");
  const { generationId } = require("../../lib/generationId.js");
  const { TestQuestion } = require("../../lib/testQuestionClass.js");

 class TestQuestionService {
  getAllTestQuestion() {
    const testQuestionPath = path.join(__dirname, "../../../database", "test_questions.json");

    const testQuestionDataSource = new DataSource(testQuestionPath);

    const testQuestions = testQuestionDataSource.read();

    const resData = new ResData("get all testQuestions", 200, testQuestions);

    return resData;
  }

  createTestQuestion(body) {
    if (!body || !body.testId || !body.questionId) {
      throw new TestIdQuestionIdRequiresException();
    }
        
    const testQuestionDir = path.join(__dirname, "../../../database", "test_questions.json");
    const testDir = path.join(__dirname, "../../../database", "tests.json");
    const testData = new DataSource(testDir);
    const questionDir = path.join(__dirname, "../../../database", "questions.json");
    const questionData = new DataSource(questionDir);
    const testQuestionData = new DataSource(testQuestionDir);

    const testQuestions = testQuestionData.read();
    const questions = questionData.read();
    const tests = testData.read();
    
    const foundTest = tests.find((test) => test.id === body.testId);
    const foundQuestion = questions.find((question) => question.id === body.questionId);
    if (!foundTest) {
      throw new TestNotFoundException();
    }
    if (!foundQuestion) {
      throw new QuestionNotFound();
    }
    const foundTestQuestion = testQuestions.find(
      (testquestion) => testquestion.test_id === body.testId && testquestion.question_id === body.questionId
    );
    if (foundTestQuestion) {
      throw new TestHasQuestionException();
    }
    
    const newTestQuestionId = generationId(testQuestions);
  
    const newTestQuestion = new TestQuestion(
      newTestQuestionId,
      body.testId,
      body.questionId
    );
    testQuestions.push(newTestQuestion);
    testQuestionData.write(testQuestions);

    const resData = new ResData("created test question", newTestQuestion);

    return resData;
  }

  getTestQuestionById(id) {
    if (isNaN(id)) {
      throw new TestQuestionIdMustBeNumberException();
    }
    const testQuestionDir = path.join(__dirname, "../../../database", "test_questions.json");

    const testQuestionData = new DataSource(testQuestionDir);
    const testQuestions = testQuestionData.read();

    const foundTestquestion = testQuestions.find((testQuestion) => testQuestion.id===id);
    if (!foundTestquestion) {
      throw new TestNotFoundException();
    }

    const resData = new ResData("found testquestion by id", 200, foundTestquestion);

    return resData;
  }
  deleteTestQuestion(id){
    const { data: foundTestQuestionById } = this.getTestQuestionById(id);
    const testQuestionDir = path.join(__dirname, "../../../database", "test_questions.json");

    const testQuestionData = new DataSource(testQuestionDir);
    const testQuestions = testQuestionData.read();

    const filterTestQuestion = testQuestions.filter(
      (testquestion) => testquestion.id !== foundTestQuestionById.id
    );
  
    testQuestionData.write(filterTestQuestion);

    const resData = new ResData("deleted test-question", 200, foundTestQuestionById);

    return resData;
  }
}

module.exports = { TestQuestionService };