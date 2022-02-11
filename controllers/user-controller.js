const {User,Thought} = require("../models")

const userController ={

getUsers(req,res){
    User.find()
    .then((userData)=>{
        res.json(userData)
    })
},

getSingleUser(req,res){
    User.findOne({
        _id: req.params.userId,
        

    })
    .populate('friends')
    .populate('thoughts')
    .then((userData)=>{
        res.json(userData)
    })
}


}
module.exports = userController;