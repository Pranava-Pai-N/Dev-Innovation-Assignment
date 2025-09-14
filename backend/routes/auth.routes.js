import express from 'express';

import { register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import wrapAsync from "../utils/wrapAsync.js"

const router = express.Router();


// Post : /Register rote for registering users

router.post("/register",wrapAsync(register));

// Post : /login for users login after register

router.post("/login",wrapAsync(login));

export default router;
