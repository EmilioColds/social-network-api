const router = require('express').Router();
const { User, Thought } = require('../../models');

//GET thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET single thought
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id });
        if(!thought) {
            res.status(404).json({ message: "There's no thought with that ID!" });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST thought
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true });
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE (PUT) a thought
router.put('/:id', async (req, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true });
        res.json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE thought
router.delete('/:id', async (req, res) => {
    try {
        const deleteThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deleteThought) {
            res.status(404).json({ message: "There's no thought with that ID!" });
            return;
        }
        await User.findByIdAndUpdate(thought.userId, 
            { $pull: { thoughts: req.params.id } },
            { new: true });
        res.json({ message: 'Thought deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body }},
            { new: true }
        );
        res.json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.thoughtId.reactionId } } },
            { new: true }
        );
        if (!updateThought) {
            res.status(404).json({ message: 'No thought or reaction found with that ID!' });
            return;
        }
        res.json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;