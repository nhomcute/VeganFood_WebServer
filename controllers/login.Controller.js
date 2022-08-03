const User = require("../models/user.models");

const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
    res.render('./user/login')
}
exports.loginPost = async (req, res, next) => {
    const user = await User.findOne({Email: req.body.loginEmail});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.loginpassword, user.Password);
        if (validPassword) {
            if (user.Role === "Admin") {
                req.session.user = user;
                res.redirect('/index');
            } else if (user.Role === "User") {
                res.redirect("/login");
            }
        } else {
            res.redirect('/login');
        }
        console.log(validPassword + " " + " " + user.Password + " " + req.body.loginpassword);
    } else {
        res.status(401).json({error: "Không tồn tại user"});
    }
}
