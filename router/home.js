'use strict';

async function getHomeRoute(req, res, next) {
  try {
    res.render('home', {
      title: 'EMR Database',
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
