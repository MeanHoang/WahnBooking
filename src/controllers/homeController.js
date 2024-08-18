const db = require('../models/index.js');
const {
    createdNewUser
} = require('../services/CRUDService.js');

const getHomepage = async (req, res) => {
    return res.render('home.ejs');
}

const getListUser = async (req, res) => {
    try {
        let data = await db.User.findAll();
        //console.log("check data user: ", data);
        return res.render('User/listUser.ejs', { Users: data });
    } catch (error) {
        console.log(error);
    }
}

const getAddUser = async (req, res) => {
    return res.render('User/addUser.ejs');
}

const getUpdateUser = async (req, res) => {
    res.render('let wait update');
}

const postAddUser = async (req, res) => {
    let message = await createdNewUser(req.body);
    console.log(message);
    res.redirect('/listUser');
}
module.exports = {
    getHomepage,
    getListUser,
    getAddUser,
    getUpdateUser,
    postAddUser
}
