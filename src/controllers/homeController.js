const db = require('../models/index.js');
const {
    createdNewUser, getAllUser, getUserById,
    updateUserData, deleteUserById
} = require('../services/CRUDService.js');

const getHomepage = async (req, res) => {
    return res.render('home.ejs');
}

const getListUser = async (req, res) => {
    try {
        let data = await getAllUser();
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
    // console.log("check  req.", req.query);
    // req.params and req.query
    let id = req.params.id;
    if (id) {
        let user = await getUserById(id);
        console.log("check user:", user);
        return res.render('User/updateUser.ejs', { Users: user });
    }
    else {
        return res.send('NOT FOUND USERS!');
    }
}

const postAddUser = async (req, res) => {
    let message = await createdNewUser(req.body);
    console.log(message);
    res.redirect('/listUser');
}

const postUpdateUser = async (req, res) => {
    console.log("check req.body:", req.body);
    let data = req.body;
    await updateUserData(data);
    res.redirect('/listUser');
}

const postDeleteUser = async (req, res) => {
    let id = req.params.id;
    if (id) {
        await deleteUserById(id);
        res.send("Delete succed!");
    } else {
        res.send("NOT FOUND USER!");
    }
    await deleteUserById(id);
}
module.exports = {
    getHomepage,
    getListUser,
    getAddUser,
    getUpdateUser,
    postAddUser,
    postUpdateUser,
    postDeleteUser
}
