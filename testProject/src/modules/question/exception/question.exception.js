class QuestionBadrequestException extends Error {
    constructor() {
      super("title must be required");
  
      this.statusCode = 400;
    }
  }
  
  class QuestionIdMustBeNumberException extends Error {
    constructor() {
      super("question id must be number");
  
      this.statusCode = 400;
    }
  }
  
  class QuestionNotFoundException extends Error {
    constructor() {
      super("question not found");
  
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    QuestionBadrequestException,
    QuestionIdMustBeNumberException,
    QuestionNotFoundException,
  };
  