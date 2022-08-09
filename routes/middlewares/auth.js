const { SECRET } = require("../../constants");
const {userModel} = require("../../database/user");
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
      console.log(req.headers);
    let token = req.headers.token;

    console.log(token);

    
    if (token) {
        try {
            const decoded_user = jwt.verify(token, SECRET);

            const user = await userModel.findOne({
                email: decoded_user.email
            })

            if (user) {
                req.context.user = user;
            } else {
                return res.status(401).send({
                    error: "You need to login to proceed."
                })
            }

        } catch(ex) {
            console.log(ex)
            return res.status(400).send({
                error: "Invalid Token provided"
            })
        }
    }else {
        res.status(404).send({
             error : "You need to login or signup to procceed"
        })
    }

    next();
}

module.exports = {
      auth
}