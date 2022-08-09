const {userModel} = require("../database/user");
const jwt = require('jsonwebtoken');
const {SECRET} = require("../constants")


async function registerUser(req , res , next){
  
    const {user} = req.body;
    let existingUser = await userModel.findOne({email : user.email})

     try {  

    if(existingUser){
          return res.status(404).send({
              error : "User already registered"     
            })
    }
  

   let userDoc =  await userModel.create(user);
    
       res.status(201).send({
           message : "user succesfully registered",
           user : userDoc
      })

    }catch(err){
          return res.status(404).send({
               error : "Something Went Wrong"
          })
    }
} 


// async function registerWithGoogle(req, res) {
//     const { googleToken } = req.body; // email, name, and password

// }


async function loginUser(req , res , next){


      try { 
      const {email , password} = req.body;

      let user = await userModel.findOne({email: email});
        console.log(user);

        console.log(SECRET)

      if(user){
          if(user.password === password){
                 // generate a secret token
                // encrypt user object {id, email, name}
                let encryptedToken = jwt.sign({
                      id : user._id,
                      email : user.email,
                      name : user.name,
                } , SECRET)

                  console.log(encryptedToken);

                return res.send({
                        token: encryptedToken
                })
          }else {
               return res.status(404).send({ 
                   error : "Password does not match"
               })
          }
      }else {
           return res.status(404).send({
               error : "user Not found"
           })
      }

   }catch(err){
         return res.status(404).send({
              error : "something went wrong"      
              })
   }
}

async function addPersonalBookList(req , res , next){
       try{
          const {id} = req.params;
          const {bookId} = req.body;
          let getUser = await userModel.findById(id);

          console.log(getUser)

          getUser.personalBookList.push(bookId) 
          
        console.log(getUser);
       await getUser.save();
  
        return res.status(200).send({
            message : "personalBookList updated",
           
        })

       }catch(err){
           return res.status(404).send({
               error : "something went wrong"
           })
       }
}

async function getLoggedInUser(req , res , next){
      const {context} = req;
      if(!context.user){
          res.status(404).send({
              error : "Token not provided"
          })
      }else {
           res.status(200).send({
               data : context.user
           })
      }

}


async function searchOtherUser(req , res , next){
      try{
         const {id} = req.params;
         
         const {userId} = req.body;

        let searchUser = await userModel.findById(userId);

        console.log(searchUser)
        if(!searchUser){
             return res.status(404).send({
                  error : "user not found"
             })
        }

        return res.status(201).send({
              user : searchUser
        })

      }catch(err){
           res.status(404).send({
              error : "something went wrong"
           })
      }
}

module.exports = {
      registerUser, 
      loginUser,
      getLoggedInUser,
      addPersonalBookList,
      searchOtherUser   
}