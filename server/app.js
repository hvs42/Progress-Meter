const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const app = express();


dotenv.config({path: './config.env'});


app.use(express.json());

//we link the router file to make authentication easy
app.use(require('./router/auth'));

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewURLParser: true,
    useUnifiedTopology:true
  })
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));


//Middlewares
const middleware = (req,res, next) => {
    console.log(`Hello my Middleware`);
    next();
}

//App routers

app.get('/', (req, res) => {
    res.send(`Hello world from the server app.js`);
});

app.get('/about', middleware, (req, res) => {
    console.log(`Hello my About`);
    res.send(`Hello About world from the server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello Contact world from the server`);
});

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});




const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on port port 🔥`);