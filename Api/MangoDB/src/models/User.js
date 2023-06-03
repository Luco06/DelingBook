const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    validate(v) {
      if (!validator.isLength(v, { min: 6, max: 32 }))
        throw new Error("Le mot de passe doit être entre 6 et 20 caratères !");
    },
  },
  authTokens: [
    {
      authToken: { type: String, required: true },
    },
  ],
});

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "moulachups");
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
