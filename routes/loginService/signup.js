import express from "express";
import * as signupController from "../../controller/signup.js";

const router = express.Router();

router.post("/", signupController.auth);

router.get("/login", (req, res, next) => {});

export default router;
