const express = require("express");
const router = express.Router();
const passport = require("./googlePassport");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/login");
    console.log("login complete");
  }
);

// router.get("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.session.destroy();
//     res.redirect("/"); // 로그아웃 하면 메인 페이지로 리다이렉트 처리
//     console.log("logout complete");
//   });
// });

module.exports = router;
