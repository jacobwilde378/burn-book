const router = require('express').Router()
const {

    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    formAlliance,
    burnBridge

} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router 
.route('/:userid/friends/:friendid')
.put(formAlliance)
.delete(burnBridge)

module.exports = router;