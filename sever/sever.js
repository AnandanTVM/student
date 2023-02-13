const express = require("express");
const db = require("./config/connection");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const mainRouts = require("./routs/main");

app.use("/api", mainRouts);

db.connect((err) => {
    if (err) console.log(`Connection error${err}`);
    else console.log('Datebase Connected to port 27017');
  });

app.listen(3002, () => {
  console.log("Sever connected in port 3001");
});
