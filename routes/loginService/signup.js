const express = require("express");
const router = express.Router();
const db = require("../../mysql/config");
const sql = require("../../mysql/sql");

router.get("/", (req, res) => {
  res.send("회원 가입 페이지");
});

router.post("/", (req, res) => {
  const param = [
    req.body.param.email,
    req.body.param.nickname,
    req.body.param.sex,
    req.body.param.birthDate,
    req.body.param.tall,
    req.body.param.job,
    req.body.param.introduce,
    req.body.param.preference,
  ]; //받을 항목들
  db.conn.query(sql.searchUserId, param[1], (err, rows, fields) => {
    if (rows.length == 0) {
      console.log("닉네임 중복 문제 없음!");
      db.conn.query(sql.insertUserData, param);
      res.status(400).send({ msg: "success", param: param });
    } else {
      console.log("닉네임 중복임");
      res.status(200).send({ msg: "error", content: err });
    }
  });
});

module.exports = router;
