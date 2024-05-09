const router = require('express').Router();
const { Thought, User } = require('../../models');

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