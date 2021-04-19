const mysql = require("mysql2");
const express = require('express')
const User = require('./models/User')
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json({extended:true}))
app.use('/api/auth', require('./routes/auth'))

const PORT = 5000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
// const connection = mysql.createConnection({
//   host: "sql11.freesqldatabase.com",
//   user: "sql11405631",
//   database: "sql11405631",
//   password: "ZcEG1h9aNd"
// });

// async function start() {
//   try {
//     await  connection.connect(function(err){
//       if (err) {
//         return console.error("Ошибка: " + err.message);
//       }
//       else{
//         console.log("Подключение к серверу MySQL успешно установлено");
//       }
//    });
//     app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
//   } catch (e) {
//     console.log('Server Error', e.message)
//     process.exit(1)
//   }
// }

// start()
