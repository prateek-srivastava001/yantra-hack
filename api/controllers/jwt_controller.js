const jwt = require('jsonwebtoken');
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_KEY_SECRET;

const jwtController = {
    signAccessToken: (email) => {
        const payload = { email: email };
        return jwt.sign(payload, accessTokenSecret, { expiresIn: '15d' });
    }
};

module.exports = jwtController;