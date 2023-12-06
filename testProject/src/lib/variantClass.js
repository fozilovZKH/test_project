class Variant {
  constructor(id, title, description, questionId, iScorrect) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.question_id = questionId),
      (this.is_correct = iScorrect);
  }
}

module.exports = { Variant };
