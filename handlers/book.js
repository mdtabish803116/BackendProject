const {bookModel} = require("../database/book");

async function searchBookByTitle(req , res , next){

    try{  
         let {title} = req.params;

         let books = await bookModel.find({title : title});

         if(!books){
            return res.status(404).send({
                  error : "Book with this title not found"
            })
         }

         return res.status(201).send({
              message : "Succesful",
              books
         })


    }catch(err){
          console.log(err)
    }
}

async function getAllBook(req , res , next){
    try{

        let books = await bookModel.find({});

        return res.status(201).send({
              message : "successful",
              books
        })
         
    }catch(error){
       return res.status(404).send({
              error : "something went wrong"
        })
    }
}

async function addBook(req , res , next){

    const {book} = req.body;
      console.log(book)
    let existingBook = await bookModel.findOne({title : book.title})

     try{

        if(existingBook){
            return res.status(404).send({
                error : "Book already in catalogue"     
              })
      }

      const { user } = req.context

      book.user = user._id;

        let bookDoc = await bookModel.create(book);

      return res.status(200).send({
              message : "Book created successfully",
              book : bookDoc
        })


     }catch(err){
          res.status(404).send({
              err : "something wrong"
          })
     }
}

module.exports = {
      getAllBook,
      addBook,
      searchBookByTitle
}