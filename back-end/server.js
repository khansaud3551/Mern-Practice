const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Users = require("./models/user");
const cores = require("cors");

app.use(express.json());
app.use(cores());

app.get("/", (req, res) => {
  res.send("hello  ghg");
});

//For posting data
app.post("/read", async (req, res) => {
  if (
    req.body.name == "" ||
    req.body.name.length < 3 ||
    req.body.email == "" ||
    req.body.message == "" ||
    req.body.phone == ""
  ) {
    return res.send("Please fill all the fields");
  }
  const user = await Users.create({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    phone: req.body.phone,
  }).catch((err) => {
    console.log(err);
  });
  console.log(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

// for reading data
app.get("/read", async (req, res) => {
  const user = await Users.find().catch((err) => {
    console.log(err);
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//for deleting user data
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
  }
  res.send("deleted");
});

// for updating data
app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  const newEmail = req.body.email;
  if (newName == "" || newEmail == "") {
    return res.status(404).send("user name and email not found");
  }
  try {
    await Users.findByIdAndUpdate(id, {
      name: newName,
      email: newEmail,
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

//single user data
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).send("user id not found");
    }
    await res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log(`server running on port 3001`);
});

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connected to mongo");
  });
