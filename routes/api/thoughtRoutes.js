const router = require('express').Router();

const { route } = require('.');
const{
    getThoughts,
    getThoughtId,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);

router.route('/:userId').post(addThought);

router.route('/:thoughtId').get(getThoughtId).put(addThought).delete(removeThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router; 