class UserPassedBadrequestException extends Error {
    constructor() {
      super("UserId, testId must be required");
  
      this.statusCode = 400;
    }
  }
  
  class UserPassedIdMustBeNumberException extends Error {
    constructor() {
      super("Id must be number");
  
      this.statusCode = 400;
    }
  }
  
  class TestNotFoundException extends Error {
    constructor() {
      super("UserPassed not found");
  
      this.statusCode = 404;
    }
  }

  class UserNotFoundException extends Error {
    constructor() {
      super("User not found");
  
      this.statusCode = 404;
    }
  }
  class UserHasTestException extends Error {
    constructor() {
      super("This user has the test!");
  
      this.statusCode = 400;
    }
  }
  
  module.exports = {
    UserPassedBadrequestException,
    UserPassedIdMustBeNumberException,
    TestNotFoundException,
    UserNotFoundException,
    UserHasTestException
  };
  