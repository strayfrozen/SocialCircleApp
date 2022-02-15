const { User} = require("../models")

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
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },


    // update User
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {$set: req.body}, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend to user
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new:true})
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No friend found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // remove reply
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }


}
module.exports = userController;