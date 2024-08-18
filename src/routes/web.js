const express = require('express')
const router = express.Router()
const {
    getHomepage, getListUser, getAddUser,
    getUpdateUser, postAddUser
} = require('../controllers/homeController');

router.get('/', getHomepage)
router.get('/listUser', getListUser)
router.get('/addUser', getAddUser)
router.get('/updateUser/:id', getUpdateUser)

router.post('/createdUser', postAddUser)

module.exports = router;