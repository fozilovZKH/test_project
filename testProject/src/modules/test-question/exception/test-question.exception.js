class TestIdQuestionIdRequiresException extends Error {
  constructor() {
    super("testId and questionId must be required!");

    this.statusCode = 400;
  }
}

class TestHasQuestionException extends Error {
  constructor() {
    super("This test has the question!");

    this.statusCode = 400;
  }
}

class TestQuestionIdMustBeNumberException extends Error {
  constructor() {
    super("test-question id must be number");

    this.statusCode = 400;
  }
}

class TestNotFoundException extends Error {
  constructor() {
    super("test not found");

    this.statusCode = 404;
  }
}

class QuestionNotFound extends Error {
  constructor() {
    super("question not found");

    this.statusCode = 404;
  }
}

module.exports = {
  TestIdQuestionIdRequiresException,
  TestHasQuestionException,
  TestQuestionIdMustBeNumberException,
  TestNotFoundException,
  QuestionNotFound
};
