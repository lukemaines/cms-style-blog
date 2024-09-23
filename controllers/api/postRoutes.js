const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ 
      include: [{ model: User, attributes: ['username'] }, { model: Comment }]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }, { model: Comment }]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: 'Please log in to post' });
    }
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'No post found' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
