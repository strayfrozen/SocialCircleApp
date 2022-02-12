const { User, Thought } = require("../models")

const thoughtController = {

    getThoughts(req, res) {
        Thought.find()
            .then((thoughtData) => {
                res.json(thoughtData)
            })
    },

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
    }


}
module.exports = thoughtController;