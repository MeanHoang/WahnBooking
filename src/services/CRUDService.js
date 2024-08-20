const { response } = require('express');
const db = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');

const salt = bcrypt.genSaltSync(10);

let createdNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data form service:", data);
            let hashedPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender == '1' ? true : false,
                phonenumber: data.phonenumber,
                image: data.image,
                roleId: data.roleId,
                positionId: data.positionId
            })
            resolve('OK create a user succced!');
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll();
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = async (data) => {
    console.log("check data:", data);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;
                user.phonenumber = data.phonenumber;

                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }

            resolve(); //return;
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createdNewUser,
    getAllUser,
    getUserById,
    updateUserData,
    deleteUserById
}
