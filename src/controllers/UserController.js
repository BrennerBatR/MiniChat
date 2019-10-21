const axios = require("axios");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    try {
      const users = User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).send("Internal server error");
    }
  },
  async store(req, res) {
    try {
      const { username } = req.body;
      const userExists = await User.findOne({ username });
      if (userExists)
        return res.status(409).json({ msg: "User already exists" });

      const user = await User.create(req.body);

      return res.json({ user });
    } catch (e) {
      console.log("ERRO", e);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
};
