const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {


    return new Promise((resolve, reyect) => {
        const payload = {
            uid,
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reyect('no se puedo generar el JWT');
            } else {
                resolve(token);
            }

        });
    });



}

module.exports = {
    generarJWT
}