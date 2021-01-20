const { User, Thought } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                if (dbThoughtData) {
                    return User.findOneAndUpdate(
                        {
                            _id: body.username
                        },
                        {
                            $push: {
                                thoughts: dbThoughtData._id
                            }
                        },
                        { new: true })
                        .then(dbUserData => {
                            if (!dbUserData) {
                                return res.status(400).json({ message: "No User found!" })
                            }
                            res.json(dbThoughtData)
                        })
                }
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No Thought found with that id!" })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    reactionAdd({ params, body }, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $push: {
                    reactions: body
                }
            },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.send(404).json({ message: "Unable to add this Reaction!" })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    reactionRemove({ params }, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $pull: {
                    reactions: {reactionId: params.reactionId}
                }
            },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.send(404).json({ message: "Unable to delete this Reaction!" })
                }
                res.json(dbThoughtData)
            })
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController