const {Admin, validate} = require('../models/admin');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.addAdmin = (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password) {
        console.log(req.body)
      return res.send({ msg: "Please enter all fields ", error :req.body });
    }

    if (password != password2) {
      return res.send({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
        return res.send({msg: errors,name,email,password})
    } else {
      Admin.findOne({ email: email }).then((user) => {
        if (user) {
          return res.send({ msg: "Email already exists" });
        } else {
          const newUser = new Admin({
            name,
            email,
            password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
                newUser.save()
                return res.status(200).send({message: "New admin Added"})
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ message: "There was an error", error: error });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const body = req.body;
    const user = await Admin.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).send({msg: "Welcome"});
      } else {
        res.status(400).send({msg:"Check your informations"});
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was an error", error: error });
  }
};
