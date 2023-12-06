class VariantBadrequestException extends Error {
    constructor() {
      super("title and description must be required");
  
      this.statusCode = 400;
    }
  }
  
  class VariantIdMustBeNumberException extends Error {
    constructor() {
      super("variant id must be number");
  
      this.statusCode = 400;
    }
  }
  
  class QuestionIdNotFoundException extends Error {
    constructor() {
      super("questionId not found");
  
      this.statusCode = 404;
    }
  }

  class VariantNotFoundException extends Error {
    constructor() {
      super("variant not found");
  
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    VariantBadrequestException,
    VariantIdMustBeNumberException,
    QuestionIdNotFoundException,
    VariantNotFoundException,
  };
  