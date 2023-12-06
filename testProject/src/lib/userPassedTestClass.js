class UserPassed {
  constructor(id, userId, testId, totalQuestion, passedQuestion, date) {
    this.id = id;
    this.user_id = userId;
    this.test_id = testId;
    this.total_question = totalQuestion;
    this.passed_question = passedQuestion;
    this.date = date;
  }
}

module.exports = { UserPassed };
