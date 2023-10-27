const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const postLoginPage = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const errorMessage = "Adresse e-mail incorrecte.";
      return res.status(400).json({ errorMessage });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const errorMessage = "Mot de passe incorrect.";
      return res.status(400).json({ errorMessage });
    }

    req.session.user = user;

    res.status(200).json(req.session.user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Une erreur est survenue lors de la connexion.");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Erreur lors de la déconnexion");
    } else {
      res.status(200).json("Déconnexion réussie");
    }
  });
};

module.exports = {
  postLoginPage,
  logout,
};
