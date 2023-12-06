const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
  LoginAlreadyExistException,
  UserNotFoundException,
  UserTypeof,
} = require("./exception/user.exception.js");
const { generationId } = require("../../lib/generationId.js");
const { User } = require("../../lib/userClass.js");

class UserService {
  userGetAll() {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const resData = new ResData("all users", users);

    return resData;
  }

  createUser(body) {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const foundUserByLogin = users.find((user) => user.login === body.login);

    if (foundUserByLogin) {
      throw new LoginAlreadyExistException();
    }

    const generatedId = generationId(users);

    const newUser = new User(generatedId, body.login, body.password, body.fullName, body.birthdate, body.role);

    if (typeof body.fullName !== "string" || typeof body.login !== "string" || typeof body.password !=="string" || typeof body.role !=="string") {
      throw new UserTypeof();
    }

    users.push(newUser);

    userData.write(users);

    const resData = new ResData("user created", newUser);

    return resData;
  }

  userFindById(id) {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const foundUserById = users.find((user) => user.id === id);

    if (!foundUserById) {
      throw new UserNotFoundException(`This ${id} user not found`);
    }

    const resData = new ResData("found user", foundUserById);

    return resData;
  }

  updateUser(body, id) {
    const userDir = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userDir);

    const users = userData.read();

    const foundUserIndex = users.findIndex((user) => user.id === id);

    if (foundUserIndex === -1) {
      throw new UserNotFoundException();
    }
    const [foundUser] = users.splice(foundUserIndex, 1);

    const foundUserByLogin = users.find((user) => user.login === body.login);

    if (foundUserByLogin) {
      throw new LoginAlreadyExistException();
    }

    foundUser.login = body.login;
    foundUser.password = body.password;
    foundUser.full_name = body.fullName;
    foundUser.birthdate = body.birthdate;
    foundUser.role = body.role;

    if (typeof body.fullName !== "string" || typeof body.login !== "string" || typeof body.password !=="string" || typeof body.role !=="string") {
      throw new UserTypeof();
    }

    users.push(foundUser);
    userData.write(users);
    const resData = new ResData("user updated", foundUser);

    return resData;
  }

  deleteUser(id) {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const foundUserIndex = users.findIndex((user) => user.id === id);
    if (foundUserIndex === -1) {
      throw new UserNotFoundException();
    }

    const [deletedUser] = users.splice(foundUserIndex, 1);
    userData.write(users);
    const resData = new ResData("User deleted successfully!", deletedUser);
    return resData;
  }
}

module.exports = { UserService };