import express from "express";

import { saveToken } from "../controllers/google.js";

const router = express.Router();

router.post("/google-auth", saveToken);

export default router;
