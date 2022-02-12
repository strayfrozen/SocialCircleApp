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
    createThought({ body }, res) {
        Thought.create(body)
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },


    // update Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
     deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add reaction to thoughts
    addReaction({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.reactionId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
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
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    }


}
module.exports = thoughtController;