const express = require('express');
const userRouter = express.Router();
const {registerUser , loginUser, getLoggedInUser,  addPersonalBookList , searchOtherUser} = require("../handlers/user");
const {auth} = require("./middlewares/auth");


userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.get("/getLoggedIn" , auth , getLoggedInUser);
userRouter.patch("/addPersonalBookList/:id" , auth ,addPersonalBookList);
userRouter.post("/user/:id" , searchOtherUser);


module.exports = {
      userRouter
}