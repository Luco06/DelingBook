const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const SECRET = process.env.TOKEN_KEY;

const authentification = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, SECRET);
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": authToken,
    });
    if (!user) throw new Error();
    req.authToken = authToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Merci de vous authentifier !");
  }
};

module.exports = authentification;
