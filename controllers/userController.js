const { User, Thought } = require('../models');

const userController = {
    getUsers(req,res) {
        User.find()
            .select('-__v')
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch(err => {
                res.status(500).json(err)
            })
    },
    getUserId(req,res) {
        User.findOne( { _id: req.params.userId} )
            .select('-__v')    
            .populate('thoughts')
            .then((user) => 
                !user
                    ?res.status(404).json({ message: 'No user with that ID' })
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser (req,res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId}, req.body, {
            new: true,
            runValidators: true,
        })
            .then((user) => 
                !user
                    ?res.status(404).json({ message: 'No user found with that ID' })
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
}