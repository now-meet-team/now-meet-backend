import express from "express";
import * as authController from "../../controller/auth.js";

const router = express.Router();

router.get("/", authController.hi);

router.get("/", (req, res, next) => {});

export default router;
