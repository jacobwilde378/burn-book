const router = require('express').Router()
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    reactionAdd,
    reactionRemove
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .put(reactionAdd)

router
.route('/:thoughtId/reactions/:reactionId')
    .delete(reactionRemove)

module.exports = router