const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

const connection = require('./config/db');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// // This is for localhost coniguration
// const connection = mysql.createConnection({
//   host     : 'localhost' ,
//   user     : 'root',
//   password : 'sopheak1234',
//   database : 'social_db'
// });

app.get("/", (req, res) => {
  // Find count of users in DB
  const q = "SELECT COUNT(*) AS count FROM users_demo";
  connection.query(q, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.render("home", { count: count });
  });
});

app.post("/register", (req, res) => {
  const person = {
    email: req.body.email
  };

  connection.query("INSERT INTO users_demo SET ?", person, (err, result) => {
    if (err) return res.send('Error with inserting data');
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// process.on("uncaughtException", err => {
//   console.log("UNHANDLED EXCEPTION! 👿  Shutting down...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// process.on("unhandledRejection", err => {
//   console.log("UNHANDLED REJECTION! 👿  Shutting down...");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
