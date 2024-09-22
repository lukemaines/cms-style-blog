const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  }

  try {
    const userId = req.session.user_id;
    const userData = await User.findByPk(userId, {
        attributes: ['username'],
    });
    if (!userData) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const postData = await Post.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      logged_in: true,
      username: userData.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  }
  res.render("new-post", { logged_in: true });
});

router.get("/edit/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  }
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "No post found" });
      return;
    }
    const post = postData.get({ plain: true });
    res.render("edit-post", {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
