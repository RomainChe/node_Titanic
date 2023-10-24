const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, password_confirm } = req.body;
    console.log(req.body);

    if (!username || !email || !password || !password_confirm) {
      const errorMessage = "Tous les champs sont obligatoires.";
      return res.status(400).json({ errorMessage });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const errorMessage = "Cet utilisateur existe déjà.";
      return res.status(400).json({ errorMessage });
    }

    if (password !== password_confirm) {
      const errorMessage = "Les mot de passe ne sont pas identiques !";
      return res.status(400).json({ errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors de l'inscription.");
  }
};

module.exports = { registerUser };