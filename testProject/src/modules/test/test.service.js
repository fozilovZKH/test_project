const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
  TestBadrequestException,
  TestIdMustBeNumberException,
  TestNotFoundException,
} = require("./exception/test.exception.js");
const { generationId } = require("../../lib/generationId.js");
const { Test } = require("../../lib/testClass.js");

class TestService {
  getAllTest() {
    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const resData = new ResData("get all tests", 200, tests);

    return resData;
  }

  createTest(dto) {
    if (!dto || !dto.title) {
      throw new TestBadrequestException();
    }

    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const generatedId = generationId(tests);

    const newTest = new Test(generatedId, dto.title);

    tests.push(newTest);

    testDataSource.write(tests);

    const resData = new ResData("test created", 201, newTest);

    return resData;
  }

  updateTest(dto, testId) {
    if (!dto || !dto.title) {
      throw new TestBadrequestException();
    }

    if (isNaN(testId)) {
      throw new TestIdMustBeNumberException();
    }

    const { data: foundTestById } = this.getOneTestById(testId);

    foundTestById.title = dto.title;

    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const filterTests = tests.filter((test) => test.id !== foundTestById.id);

    filterTests.push(foundTestById);

    testDataSource.write(filterTests);

    const resData = new ResData("update test", 200, foundTestById);

    return resData;
  }

  getOneTestById(testId) {
    if (isNaN(testId)) {
      throw new TestIdMustBeNumberException();
    }

    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const foundTest = tests.find((test) => test.id === testId);

    if (!foundTest) {
      throw new TestNotFoundException();
    }

    const resData = new ResData("found test by id", 200, foundTest);

    return resData;
  }

  deleteTest(testId) {
    const { data: foundTestById } = this.getOneTestById(testId);

    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const filterTests = tests.filter((test) => test.id !== foundTestById.id);

    testDataSource.write(filterTests);

    const resData = new ResData("deleted test", 200, foundTestById);

    return resData;
  }
}

module.exports = { TestService };
