const bcrypt = require('bcrypt');
const users = require('../public/data/users.json');
const games = require('../public/data/games.json');
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../public/data/users.json');
const gamesPath = path.join(__dirname, '../public/data/games.json');

const users = require(usersPath);
const games = require(gamesPath);

class UsersController {

  openFormRegister = (req, res) => {
    res.render('register', { message: "" });
  }

  register = async (req, res) => {
    const { name, last_name, email, password, preferences } = req.body;

    if (!name || !last_name || !email || !password || !preferences) {
      return res.render("register", { message: "Debes cumplimentar todos los campos" });
    }

    if (!req.file) {
      return res.render('register', { message: "Es obligatorio usar skin" });
    }

    // Comprobar si el email ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.render('register', { message: "El email ya existe" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = {
      id_user: Math.max(...users.map(u => u.id_user)) + 1, // siguiente id
      name,
      last_name,
      email,
      password: hash,
      preferences,
      image: req.file.filename,
      user_deleted: 0
    };

    users.push(newUser);

    // Guardar JSON actualizado
    const filePath = path.join(__dirname, '../public/data/users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    res.redirect('/');
  }

  addUser = (req, res) => {
    const activeUsers = users.filter(u => u.user_deleted === 0);
    res.render('index', { thisUser: activeUsers });
  }

  openUser = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id_user == id);

    if (!user) return res.status(404).send("Usuario no encontrado");

    const userGames = games.filter(g => g.id_user == id && g.game_deleted === 0);

    res.render('user', { thisUser: user, game: userGames });
  }

  openEditUser = (req, res) => {
    const { id_user } = req.params;
    const user = users.find(u => u.id_user == id_user);

    if (!user) return res.status(404).send("Usuario no encontrado");

    res.render('editUser', { userEdited: user, message: "" });
  }

  editUser = (req, res) => {
    const { name, last_name, email, preferences } = req.body;
    const { id_user } = req.params;

    if (!name || !last_name || !email || !preferences) {
      const temp = { id_user, name, last_name, email, preferences };
      return res.render("editUser", { userEdited: temp, message: "Debes cumplimentar todo el formulario" });
    }

    const user = users.find(u => u.id_user == id_user);
    if (!user) return res.status(404).send("Usuario no encontrado");

    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.preferences = preferences;

    // Guardar JSON actualizado
    const filePath = path.join(__dirname, '../public/data/users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    res.redirect(`/users/user/${id_user}`);
  }

  deletedTotalUser = (req, res) => {
    const { id_user } = req.params;
    const index = users.findIndex(u => u.id_user == id_user);

    if (index !== -1) {
      users.splice(index, 1);
      const filePath = path.join(__dirname, '../public/data/users.json');
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    res.redirect('/');
  }

  deletedUser = (req, res) => {
    const { id_user } = req.params;
    const user = users.find(u => u.id_user == id_user);

    if (user) {
      user.user_deleted = 1;
      const filePath = path.join(__dirname, '../public/data/users.json');
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    res.redirect('/');
  }

}

module.exports = new UsersController();
