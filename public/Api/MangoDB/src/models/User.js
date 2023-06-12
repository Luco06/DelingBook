const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.TOKEN_KEY;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("Email non valide !");
    },
  },
  telephone: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 10, max: 10 }))
        throw new Error("Numéros de téléphone invalide !");
    },
  },
  mdp: {
    type: String,
    required: true,
  },
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.mdp;
  delete user.authTokens;
  return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, SECRET);
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.statics.findUser = async (email, mdp) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Vérifier vos identifiants");
  const isMdpValid = await bcrypt.compare(mdp, user.mdp);
  if (!isMdpValid) throw new Error("Vérifier vos identifiants !");
  return user;
};

userSchema.pre("save", async function () {
  if (this.isModified("mdp")) this.mdp = await bcrypt.hash(this.mdp, 8);
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
