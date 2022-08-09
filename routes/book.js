const express = require('express');
const bookRouter = express.Router();
const { getAllBook , addBook , searchBookByTitle} = require("../handlers/book");
const {auth} = require("./middlewares/auth");


bookRouter.get("/books" , getAllBook);
bookRouter.post("/book" , auth ,  addBook);
bookRouter.get("/bookByTitle/:title" , searchBookByTitle);



module.exports = {
      bookRouter
}