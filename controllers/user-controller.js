const { User, Thought } = require("../models")

const userController = {

    getUsers(req, res) {
        User.find()
            .then((userData) => {
                res.json(userData)
            })
    },

    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId,
        })
            .populate('friends')
            .populate('thoughts')
            .then((userData) => {
                res.json(userData)
            })
    },


    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },


    // update User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

     // delete pizza
     deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }


}
module.exports = userController;