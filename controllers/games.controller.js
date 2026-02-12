const fs = require('fs');
const path = require('path');
const users = require('../public/data/users.json');
const games = require('../public/data/games.json');

class GameController {

  openAddGame = (req, res) => {
    const { userId } = req.params;
    res.render('addGame', { message: "", userId });
  }

  addGame = (req, res) => {
    const { userId } = req.params;
    const { name, review, stars, platform, year_publication } = req.body;

    if (!userId || !name || !review || !stars || !platform || !year_publication) {
      return res.render("addGame", { message: "Debes cumplimentar todo el formulario", userId });
    }

    if (!req.file) {
      return res.render('addGame', { message: "Es obligatorio poner imagen", userId });
    }

    const newGame = {
      id_game: Math.max(...games.map(g => g.id_game)) + 1,
      id_user: parseInt(userId),
      name,
      review,
      stars: parseInt(stars),
      platform,
      year_publication: parseInt(year_publication),
      image: req.file.filename,
      game_deleted: 0
    };

    games.push(newGame);

    const filePath = path.join(__dirname, '../public/data/games.json');
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');

    res.redirect(`/users/user/${userId}`);
  }

  openAddNewGameSelect = (req, res) => {
    const activeUsers = users.filter(u => u.user_deleted === 0);
    res.render("addNewGameSelect", { thisUser: activeUsers, message: "" });
  }

  addNewGameSelect = (req, res) => {
    const { id_user, name, review, stars, platform, year_publication } = req.body;

    if (!id_user || !name || !review || !stars || !platform || !year_publication || !req.file) {
      const activeUsers = users.filter(u => u.user_deleted === 0);
      return res.render("addNewGameSelect", { thisUser: activeUsers, message: "Debes cumplimentar todo el formulario" });
    }

    const newGame = {
      id_game: Math.max(...games.map(g => g.id_game)) + 1,
      id_user: parseInt(id_user),
      name,
      review,
      stars: parseInt(stars),
      platform,
      year_publication: parseInt(year_publication),
      image: req.file.filename,
      game_deleted: 0
    };

    games.push(newGame);

    const filePath = path.join(__dirname, '../public/data/games.json');
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');

    res.redirect(`/users/user/${id_user}`);
  }

  openEditGame = (req, res) => {
    const { id_game } = req.params;
    const game = games.find(g => g.id_game == id_game);

    if (!game) return res.status(404).send("Juego no encontrado");

    res.render("editGame", { gameEdited: game, message: "" });
  }

  editGame = (req, res) => {
    const { id_game, id_user } = req.params;
    const { name, review, stars, platform } = req.body;

    if (!name || !review || !stars || !platform) {
      const temp = { id_game, id_user, name, review, stars, platform };
      return res.render("editGame", { gameEdited: temp, message: "¡ Debes cumplimentar todo el formulario !" });
    }

    const game = games.find(g => g.id_game == id_game);
    if (!game) return res.status(404).send("Juego no encontrado");

    game.name = name;
    game.review = review;
    game.stars = parseInt(stars);
    game.platform = platform;

    const filePath = path.join(__dirname, '../public/data/games.json');
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');

    res.redirect(`/users/user/${id_user}`);
  }

  deletedTotalGame = (req, res) => {
    const { id_game, id_user } = req.params;
    const index = games.findIndex(g => g.id_game == id_game);

    if (index !== -1) {
      games.splice(index, 1);
      const filePath = path.join(__dirname, '../public/data/games.json');
      fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');
    }

    res.redirect(`/users/user/${id_user}`);
  }

  deletedGame = (req, res) => {
    const { id_game, id_user } = req.params;
    const game = games.find(g => g.id_game == id_game);

    if (game) {
      game.game_deleted = 1;
      const filePath = path.join(__dirname, '../public/data/games.json');
      fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');
    }

    res.redirect(`/users/user/${id_user}`);
  }

}

module.exports = new GameController();
