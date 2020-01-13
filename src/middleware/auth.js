const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    //gets header named "Authorization"
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
