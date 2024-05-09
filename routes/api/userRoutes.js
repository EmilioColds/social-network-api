const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET single user
routter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//PUT new user
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'The user and its associated thoughts are DELETED!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.param.userId, 
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.param.userId, 
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;