const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    });

    console.log('New user created:', newUser); 

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req,res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email.toLowerCase() }});

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email, please try again' });
      return;
    }
    console.log('Password provided by user:', req.body.password);
    console.log('Stored hashed password:', userData.password);
    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('session saved:', req.session)
      res.json({ user: userData, message: 'logged in' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
