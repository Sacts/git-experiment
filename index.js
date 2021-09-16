const Joi = require('joi');
var http = require("http");
const startupDebugger = require("debug")('app:startup');
const dbDebugger = require("debug")('app:db');
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const { urlencoded } = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/vidly')
    .then(console.log("Connected to mongodb..."))
    .catch(err => console.error('Could not connect to mongodb...'));

// app.set("view engine", "pug");
// app.set("views", "./views");
app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// app.use(helmet());

// Configuration

// console.log(`Application name: ${config.get("name")}`);
// console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

// if (app.get('env') === 'development'){
//     app.use(morgan("tiny"));
//     startupDebugger("Morgan enabled...");
// }

// DB work
// dbDebugger("Connected to database...");

// app.use(logger);

// app.use(function(req,res,next){
//     console.log("Authenticating...");
//     next();
// });

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port ${port}`));

// const server = http.createServer((req,res) => {
//     if (req.url === '/'){
//         res.write("YOLO");
//         res.end();
//     }
//     if (req.url === '/api/courses'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

// server.listen(3000);
// console.log("Listening on port 3000")