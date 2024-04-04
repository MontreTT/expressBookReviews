const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let authentication = false
    for (user in users){
        if (users.username === username){
        authenication = true
        }
    }
    return authentication
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let authentication = false
    for (user in users){
        if (users.username === username && users.password === password )
            authenication = true
    }
    return authentication
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  review = req.body
  book = books.filter((books)=> books.isbn === req.params.isbn)
  book.reviews.push(review)
  return res.status(200).json({message: `review ${review} successfully added for ${book.title}`})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
