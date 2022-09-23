const { Thought, User, Types } = require('../models');

const thoughtController = {
    getThoughts(req,res) {
        Thought.find()
            .sort({_id: -1})
            .then()
    }
}