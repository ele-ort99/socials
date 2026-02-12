class IndexController {
  openHome = (req, res) => {
    // Filtrar solo usuarios no eliminados
    const activeUsers = users.filter(user => user.user_deleted === 0);

    // Renderizar la vista con los usuarios
    res.render('index', { thisUser: activeUsers });
  };
}

module.exports = new IndexController();
