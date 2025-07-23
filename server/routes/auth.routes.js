import { SignIn, SignOut, signUp } from "../controllers/auth.controller.js";

import express from "express";

const authRouter =express.Router();

authRouter.post("/signUp",signUp);
authRouter.post("/signIn",SignIn);
authRouter.get("/signOut",SignOut);

export default authRouter;
