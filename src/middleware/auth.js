const jwt = require("jsonwebtoken");
const User = require("../models/user");

/*
  AUTHORIZATION
  Pull token from the authorization header and then replace the token with ""
  decode the token with jwt.verify()
  find the user from the id and the token
  throw an error if there isnt a user
  else authorize the user
  if not authorized send a message
*/
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "shh");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please Authenticate." });
  }
};
//dont export with {} it breaks for some reason.
module.exports = auth;
