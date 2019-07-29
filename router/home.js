'use strict';

module.exports = {
  getHomeRoute: (req, res, next) => {
    try {
      res.render('home', {
        title: 'EMR Database',
        pageId: 'home',
        username: req.session.username,
      });
    } catch (error) {
      next(error);
    }
  },
};
