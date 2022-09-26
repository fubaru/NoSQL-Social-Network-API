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
    
}