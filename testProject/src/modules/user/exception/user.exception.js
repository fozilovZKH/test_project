class LoginAlreadyExistException extends Error {
  constructor() {
    super("This login already exist");

    this.statusCode = 400;
  }
}
class UserNotFoundException extends Error {
  constructor() {
    super("This login already exist");

    this.statusCode = 404;
  }
}
class UserTypeof extends Error {
  constructor() {
    super("Login, password, fullName and role must be string");

    this.statusCode = 400;
  }
}

module.exports = {
  LoginAlreadyExistException,
  UserNotFoundException,
  UserTypeof,
};
