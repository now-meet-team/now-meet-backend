module.exports = {
  insertUserData:
    "INSERT INTO users(email, nickname ,sex, birthDate, tall, job, introduce, preference) VALUES(?,?,?,?,?,?,?,?)",
  insertEmail: "INSERT INTO users(email) VALUES (?)",
  searchUserId: "SELECT nickname FROM users WHERE nickname=?",
  searchGoogleID: "SELECT email FROM users WHERE email=?",
};
