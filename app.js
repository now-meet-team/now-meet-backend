import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import helmet from "helmet";
import { dotconfig } from "./dotconfig.js";
import { sequelize } from "./db/database.js";

const app = express();

//^ Routes Import
import authRouter from "./routes/loginService/auth.js";
import signupRouter from "./routes/loginService/signup.js";

//^ Port Setting
const port = dotconfig.host.port;

//^ Middel Wear Setting
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(helmet());
// app.use(passport.initialize());
// app.use(passport.session());

//^ Routes Connect
app.use("/", authRouter); // 로그인 서비스 / 메인 화면 라우터
app.use("/signup", signupRouter); // 로그인 서비스 / 회원가입 라우터

//^ Error MiddleWear Setting
app.use((req, res, next) => {
  res.sendStatus(404);
}); // 존재하지 않는 URL

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
}); // 에러 미들웨어

sequelize.sync();
//^ Port Connect setting
app.listen(port, () => {
  console.log(`-----------------------------------${port} Server runnig OK `);
});
