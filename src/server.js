const express = require('express') //app su dung express
// const path = require('path') // thu vien xu ly duong dan file
require('dotenv').config() // them thu vien dotenv
const configureViewEngine = require('./config/ViewEngine') // import ham cau hinh view engine
const webRoutes = require('./routes/web') // import route web
 const connection = require('./config/database') // import database connection

const app = express()
const port = process.env.PORT || 8888 // su dung bien moi tu file .env
const hostname = process.env.HOST_NAME

// config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


// config template engine
configureViewEngine(app)

// khai bao route
app.use('/', webRoutes)

// test connection


// // A simple SELECT query
// connection.query(
//   'select * from Users u',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );


// khoi dong server
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
