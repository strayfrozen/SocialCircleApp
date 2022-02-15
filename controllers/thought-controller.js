const { User, Thought } = require("../models")

const thoughtController = {
    //get all
    getThoughts(req, res) {
        Thought.find()
            .then((thoughtData) => {
                res.json(thoughtData)
            })
    },
    //get by id
    getSingleThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId,
        })
            .populate('reactions')
            .populate('users')
            .then((thoughtData) => {
                res.json(thoughtData)
            })
    },


    // create Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtData => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
            })
            .then(userData => {
                res.json(userData)
            })
            .catch(err => res.status(400).json(err));
    },


    // update Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete Thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then(userData => {
                res.json(userData)
            })
            .catch(err => res.status(400).json(err));
    },

    // add reaction to thoughts
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove reply
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    }


}
module.exports = thoughtController;