const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  res.send("앱 로그인 화면");
}); // 메인 접속 시 아이디 로그인 되어 있으면, 접속 처리 and 안되어 있으면 login 리다이렉트

module.exports = router;
