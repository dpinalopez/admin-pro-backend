const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { email, password } = req.body;


    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                of: false,
                msg: 'email no encontrado'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            })
        }

        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log();
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        })
    }

}


const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        console.log('1');
        const { name, email, picture } = await googleVerify(googleToken);
        console.log('2');
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            console.log('3');
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            console.log('4');
            usuario = usuarioDB;
            usuario.google = true;
        }
        console.log('5');
        await usuario.save();
        console.log('6');
        const token = await generarJWT(usuario.id);
        console.log('7');
        res.json({
            ok: true,
            msg: "Google Sing In",
            token
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: "token no correcto",
            error
        })

    }

}


const renewToken = async(req, res = response) => {


    const uid = req.uid;
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}
module.exports = {
    login,
    googleSignIn,
    renewToken
}