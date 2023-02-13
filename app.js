const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const fileStore = require("session-file-store")(session);

require("dotenv").config();

//^ Port Setting
const port = process.env.NODE_PORT_ENV || 3000;

//^ Middel Wear Setting
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret", // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: new fileStore(), // 세션이 데이터를 저장하는 곳
  })
);

//^ Routes Setting
app.use("/", require("./routes/loginMain")); // 메인 화면 라우터
app.use("/signup", require("./routes/signup")); // 회원 가입 라우터

//^ Port Connect setting
app.listen(port, () => {
  console.log(`-----------------------------------${port}번 서버 실행 OK `);
});
