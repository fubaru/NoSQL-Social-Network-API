const { Thought, User, Types } = require('../models');

const thoughtController = {
    getThoughts(req,res) {
        Thought.find()
            .select("-__v")
            .sort({_id: -1})
            .then((dbThoughtData)=>{
                res.json(dbThoughtData)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },
    getThoughtId(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((dbThoughtData) => {
                !dbThoughtData
                    ?res.status(404).json({ message: "No thought found with this id" })
                    :res.json(dbThoughtData)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    addThought(req,res) {
        Thought.create(req.body)
            .then(({_id})=>{
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((user)=>{
                !user
                    ?res.status(404).json({ message: "No user found with this id" })
                    :res.json(user)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },
    removeThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought)=> {
                if (!thought) {
                    return res.status(404).json({ message: "No Thought found with this id" })
                }
                return User.findOneAndUpdate(
                    { _id: req.params.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then((user)=>{
                res.json(user)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((user)=> {
                !user
                 ?res.status(404).json({ message: "No User found with this Id" })
                 :res.json(user)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },
    removeReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {new: true}
        )
            .then((user) => {
                !user
                 ?res.status(404).json({ message: "No User found with this Id" })
                 :res.json(user)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    }
};

module.exports = thoughtController