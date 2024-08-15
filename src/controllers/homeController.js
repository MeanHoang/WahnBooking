const db = require('../models/index.js');

const getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log("check data user: ", data);
        return res.render('home.ejs');
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getHomepage
}
