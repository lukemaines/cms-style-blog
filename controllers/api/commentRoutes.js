const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(newComment);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: { id: req.params.id, user_id: req.session.user_id },
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }

        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;