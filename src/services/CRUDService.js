const db = require('../models/index.js');
const bcrypt = require('bcryptjs');

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

module.exports = {
    createdNewUser
}
