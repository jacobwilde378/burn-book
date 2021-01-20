const router = require('express').Router();
const userRoutes = require('./user');
const thoughtRoutes = require('./thought');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;