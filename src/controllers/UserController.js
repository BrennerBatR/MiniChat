const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.send({ users });
    } catch (err) {
      return res.status(500).send("Erro interno no servidor");
    }
  },
  async store(req, res) {
    try {
      const { username } = req.body;
      const userExists = await User.findOne({ username });
      if (userExists)
        return res.status(409).json("Nome de usuário já cadastrado");

      const user = await User.create(req.body);

      return res.json({ user, msg: "Usuário cadastrado com sucesso" });
    } catch (e) {
      return res.status(500).send("Erro interno no servidor");
    }
  },
  async authenticate(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username }).select("+password");

      if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(403).send({ error: "Invalid Password" });

      user.password = undefined;
      res.send({
        user
      });
    } catch (e) {
      return res.status(500).send({ msg: "Erro interno no servidor" });
    }
  }
};
