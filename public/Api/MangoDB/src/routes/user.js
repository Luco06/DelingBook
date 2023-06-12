const express = require("express");
const User = require("../models/User");
const router = new express.Router();
require("dotenv").config();
const authentification = require("../midddlewares/authentification");

router.post("/users", async (req, res, next) => {
  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.mdp);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.post("/logout", authentification, async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/logout/all", authentification, async (req, res) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/users", authentification, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/me", authentification, async (req, res, next) => {
  res.send(req.user);
});
// router.get("/users/:id", async (req, res, next) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).send("l'utilisateur n'est pas trouvé !");
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
router.patch("/users/me", authentification, async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  try {
    updatedInfo.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.delete("/users/:id", async (req, res, next) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) return res.status(404).send("l'utilisateur n'est pas trouvé !");
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
router.delete("/users/me", authentification, async (req, res, next) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
