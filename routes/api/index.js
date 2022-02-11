const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users',userRoutes)
//this is where my thoughts-route will go



module.exports = router;
