const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../../models/User');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

router.get("/test", (req, res) => res.json({msg: "test router is working"}));

router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then( user => {
      if (user) {
        return res.status(400).json({ email: 'A user has already registered with this address.'})
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.post("/login", (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return req.status(400).json(errors);
  }

  const email = req.data.email;
  const password = req.data.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
    })
})

module.exports = router;