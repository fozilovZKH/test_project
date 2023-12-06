class TestBadrequestException extends Error {
  constructor() {
    super("title must be required");

    this.statusCode = 400;
  }
}

class TestIdMustBeNumberException extends Error {
  constructor() {
    super("test id must be number");

    this.statusCode = 400;
  }
}

class TestNotFoundException extends Error {
  constructor() {
    super("test not found");

    this.statusCode = 404;
  }
}

module.exports = {
  TestBadrequestException,
  TestIdMustBeNumberException,
  TestNotFoundException,
};
