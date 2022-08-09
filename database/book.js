const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
       title : {
             type : String,
             required : true
       },
       author : {
           type : String,
           required : true
       },
       user: { 
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }

},{
    timeStamps : true
})

const bookModel = mongoose.model("books" , bookSchema);

module.exports = {
      bookModel
}