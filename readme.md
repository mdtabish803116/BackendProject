1) I have deployed the app on heroku and the main api url is 
   
   https://backend-pro-app.herokuapp.com/

2) I have used express framework of Nodejs and mongoDb.

3) for getting allBooks the endpoint is 
</books> and GET method

4) for Authentication i have stored the token in headers which checks the user login or not.

5) for searching the by Title 
</bookByTitle/:title> and GET method

6) for adding the book in catalogue 
</book> and Psot Method and takes the data in body as "book" : {
       "title" : "xyz",
        "author" : "xyz"
}

7) for adding the each user personal Book list 
   </addPersonalBookList/:id> where id is userId of the loggedin user and there is also POST method for passing the bookId which will add to the user personalBookList

8) for searching the other user 
  </user/:id> where id is userId of loggedin user passes as params and using POST method passing title in body
   "book" :  {"tittle" : "xyz"} 
    