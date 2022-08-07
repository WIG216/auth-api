const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

//User Model
const User = require("../models/User")

//login page
router.get("/login", (req,res) => res.render("login"));

//Register page
router.get("/register", (req,res) => res.render("register"));

//Register Handle
router.post("/register", (req,res) => {
    const {name,email,password,password2} = req.body;
    let errors = [];

    //check required fields
    if(!name||!email||!password||!password2){
        errors.push({msg: "Please fill in all the fields"});
    }else if(password !== password2){
        errors.push({msg: "Password do not match"});
    }else if(password.length<6){
        errors.push({msg:"Password should be at least 6 characters"})
    }else if(errors.length>0){
        res.render("register",
        {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //Validation
        User.findOne({email: email})
            .then(user => {
                if(user){
                    //user exist
                    errors.push({msg: "Email is already registered"})
                    res.render("register",
                    {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;

                        //set password to hash
                        newUser.password = hash;

                        //save user
                        newUser.save()
                            .then(user =>{
                                req.flash("success_msg", "You are now registered");
                                res.redirect("/users/login")
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
    }
});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
module.exports = router;