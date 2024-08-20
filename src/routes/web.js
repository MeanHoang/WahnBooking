const express = require('express')
const router = express.Router()
const {
    getHomepage, getListUser, getAddUser,
    getUpdateUser, postAddUser, postUpdateUser,
    postDeleteUser
} = require('../controllers/homeController');

router.get('/', getHomepage)
router.get('/listUser', getListUser)
router.get('/addUser', getAddUser)
router.get('/updateUser/:id', getUpdateUser)

router.post('/createdUser', postAddUser)
router.post('/saveUser', postUpdateUser)
router.get('/deleteUser/:id', postDeleteUser)


module.exports = router;