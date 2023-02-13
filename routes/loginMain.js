const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("메인페이지");
  console.log(req.session);
  if (req.session.is_logined == true) {
    res.send("환영합니다");
  } else {
    res.send("로그인 해주세요");
  }
});

module.exports = router;

// 메인 화면 입장 시 분기 처리 ( 로그인 되어 있는가? 아닌가?)
// 안되어 있다면,, 로그인 화면 출력 => 여기서 로그인 버튼 터치 시 로그인 인증으로 보냄
// 되어 있다면 => 바로 메인 로비로 입장
