class User {
  constructor(id, login, password, fullName, birthdate, role) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.full_name = fullName;
    this.birthdate = birthdate;
    this.role = role;
  }
}

module.exports = { User };
