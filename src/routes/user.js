const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

/* 
  CREATE A USER
  create new user from User model using passed in body
  save the user to database
  create authorization token using generateAuthToken() from userSchema
  if successful return 201 created code, send user and token data
  if fail return 400 status and error
  */
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
/*
    LOGIN USER
    Find user using passed in email and password,
    create Authorization token
    send the user and token.
*/
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

/* 
    LOGOUT USER
    try to filter out all user tokens that dont equal passed in token
    save user to record new tokens
    send
    if failed send 500 status 
*/
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
/*
  GET USER PROFILE
 the function requires authentication, therefore you have to be logged in
  request the information from the current user
*/
router.get("/users/me", auth, async (req, res) => {
  await res.send(req.user);
});
/*
    DELETE USER AND DATA
    must be authorized
    use remove() method from mongoose
    send the user that was deleted
    if fail send status 500
*/
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
