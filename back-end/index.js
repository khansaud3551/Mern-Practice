const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const contact = require("./routes/contactmanage");
app.use("/api", contact);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server started on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://khansaud3551:gonawazgo789@mernstack.ldfkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`Mobgodb connected with server:`);
  });
