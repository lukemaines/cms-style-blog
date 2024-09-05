const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login'); 
});


router.get('/dashboard', async (req, res) => {
  try {

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
