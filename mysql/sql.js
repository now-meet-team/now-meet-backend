module.exports = {
  insertUserData: "INSERT INTO users(email, nickname) VALUES(?,?)",
  searchUserId: "SELECT nickname FROM users WHERE nickname=?",
};
