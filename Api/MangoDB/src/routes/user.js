const express = require("express");
const User = require("../models/User");
const router = new express.Router();

router.post("/users", async (req, res, next) => {
  const user = new User(req.body);

  try {
    const saveUser = await user.save();
    res.status(201).send(saveUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.mdp);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    res.status(400).send();
  }
});
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("l'utilisateur n'est pas trouvé !");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/users/:id", async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  const userId = req.params.id;
  try {
    const user = await User.findByI(userId);
    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) return res.status(404).send("l'utilisateur n'est pas trouvé !");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("l'utilisateur n'est pas trouvé !");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
