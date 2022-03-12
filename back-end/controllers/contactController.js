const Contactmanage = require("../models/contactmodel");

exports.getallcontacts = function (req, res) {
  Contactmanage.find().then((data) => {
    res.send(data);
  });
};

exports.createcontact = async function (req, res) {
  try {
    console.log(req.body);
    const newcontact = new Contactmanage(req.body);
    const savedcontact = await newcontact.save();
    res.send(savedcontact);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

exports.deletecontact = async function (req, res) {
  try {
    const id = req.params.id;
    const deletedcontact = await Contactmanage.findByIdAndDelete(id);
    if (deletedcontact) {
      res.send(deletedcontact);
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

exports.updatecontact = async function (req, res) {
  try {
    const id = req.params.id;
    const updatedcontact = await Contactmanage.findByIdAndUpdate(id, req.body);
    if (updatedcontact) {
      res.send(updatedcontact);
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

exports.singleContact = async function (req, res) {
  try {
    const id = req.params.id;
    const singlecontact = await Contactmanage.findById(id);
    if (singlecontact) {
      res.send(singlecontact);
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
