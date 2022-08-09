let res = require('dotenv').config()
 console.log(res)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const {bookRouter} = require("./routes/book")
const {userRouter} = require("./routes/user")



app.use(cors());
app.use(express.json());
app.use(logger);
app.use(setReqContext)
app.use(userRouter);
app.use(bookRouter);


async function connectDatabase(){

    try{

      let result = await mongoose.connect(process.env.DBURL)
    //    console.log(result)
      console.log("Connected")

    //   await mongoose.close();

    }catch(err){
         console.log(err)
       console.log("not connected")
    }
}




function logger(req , res , next){
    console.log(new Date() , req.method , req.path);

    next();
}

function setReqContext(req, res, next) {
    req.context = {
        // user will be present for authenticated routes
    }
    next();

}


const PORT = process.env.PORT || 8080

connectDatabase().then(() => {
    app.listen(PORT , () => {
        console.log(`server is listening at ${PORT}`)
    })
})
