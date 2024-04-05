const express = require('express');
let books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.query;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if username already exists
    if (!isValid(username)) {
        return res.status(400).json({ message: `Username already exists This is the list with registered users ${users[0].username} `});
    }

    // Add the new user
    users.push({ username, password });
    return  res.status(201).json({ message: `User registered successfully ${JSON.stringify(users, null, 0)} ` });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn
    return res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    
    let author = req.params.author
    let filtered_user = [];
    for (let book in books) {
        if (books[book].author === author) {
            filtered_user.push(books[book])
        }
    }

    
    
    return res.send(filtered_user);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title
    let filtered_user =[]
    for (let book in books) {
        if (books[book].title === title) {
            filtered_user.push(books[book])
        }
    }
    return res.send(filtered_user);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let filtered_user = books[isbn]
    if (Object.keys(filtered_user.reviews).length === 0){
        return res.send(`There are no currently reviews for ${filtered_user.title}`);
        
    }
    else{
    return res.send(`The review for ${filtered_user.title} is ${filtered_user.reviews}`);
    }
});

module.exports.general = public_users;
