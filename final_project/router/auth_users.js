const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const app = express.Router();

let users = [];

const isValid = (username) => { 
    console.log(`Checking validity for username: ${username}`);
    let authentication = true;
    for (let user of users) {
        if (user.username === username) {
            authentication = false;
            console.log(`${username} doesnt exist in ${users}`)
            break;
        }
    }
    return authentication;
}

const authenticatedUser = (username, password) => {
    let authentication = false;
    for (let user of users) {
        if (user.username === username && user.password === password) {
            authentication = true;
            break;
        }
    }
    return authentication;
}


//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.query;
    const user = {'username': username , 'password' : password}

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user exists and the password matches
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: ` Invalid username or password ${users[0]} `});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken
    }
    return res.status(200).send(`User successfully logged in , with username ${username} `);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    review = req.body.review
    if (!review) {
        return res.status(400).json({ message: 'Review is required' });
        }
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

    books[isbn].reviews[isbn] = review;
    //book.reviews.push(review)
    return res.status(200).json({message: `review ${JSON.stringify(books[isbn])} successfully added for ${book.title}`})
});

regd_users.delete("/auth/review/:isbn", (req, res) => {

    let isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

    delete books[isbn].reviews[isbn]
    //book.reviews.push(review)
    return res.status(200).json({message: `review ${review} successfully deleted for ${book.title}  `})


})

module.exports.app = app;
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
