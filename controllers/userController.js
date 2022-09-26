const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getUserId(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "no user found with this id" });
                    return;
                }
                User.updateMany(
                    // filter for friends
                    { _id: { $in: user.friends } },
                    { $pull: { friends: req.params.id } }
                )
                    .then(() => {
                        Thought.deleteMany(
                            { username: user.username }
                        )
                            .then(() => {
                                res.json({ message: "Delete success" });
                            })
                            .catch((err) => {
                                res.status(500).json(err)
                            })
                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                    }
                    res.json(user);
                })
                .catch((err)=>{
                    res.status(500).json(err)
                });
    },
    removeFriend(req,res) {
        User.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true}
        )
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
                }
                res.json(user);
            })
            .catch((err)=>{
                res.status(500).json(err)
            });
    }
}

module.exports = userController