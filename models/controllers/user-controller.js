const { User, Thought } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.sendStatus(404)
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))

    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ mesage: "No User found with that id!" })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {

                return Thought.deleteMany({ username: params.id })
                    .then(dbThoughtData => { res.json(dbThoughtData) })
            }
            )
            .catch(err => res.json(err))
    },

    formAlliance({ params }, res) {
        User.findOne({ _id: params.userid })
            .then(dbUserData => {
                let update_flag = "Update"
                dbUserData.friends.forEach(function (element) {
                    if (String(element) === params.friendid) {
                        update_flag = "Skip"
                    }
                })
                if (update_flag === 'Skip') {
                    return res.status(200).json({ message: "They are already friends" })
                }
                else {
                    User.findOneAndUpdate(
                        {
                            _id: params.userid
                        },
                        {
                            $push: {
                                friends: params.friendid
                            }
                        },
                        { new: true })
                        .then(dbUserData => {
                            if (!dbUserData) {
                                return res.status(404).json({ message: "No user found!" })
                            }
                            res.json(dbUserData)
                        })
                }

            })
    },

    burnBridge({ params }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userid
            },
            {
                $pull: {
                    friends: params.friendid
                }
            },
            {
                new: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(400).json({ message: "No User Found!" })
                }
                res.json(dbUserData)
            })
    }
}

module.exports = userController