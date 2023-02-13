const mysql = require("mysql2");

require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("-----DB connect Ok-----");
  }
});

module.exports = {
  conn,
};
