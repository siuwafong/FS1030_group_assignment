'use strict';

async function getHomeRoute(req, res, next) {
  try {
    res.render('home', {
      title: 'Book Database',
      pageId: 'home',
      username: req.session.username,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: getHomeRoute,
};
