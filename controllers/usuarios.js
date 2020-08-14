const { response } = require('express');
const { validarCampos } = require('../middleware/validar-campos')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}


const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body)

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        const token = await generarJWT(usuario.id);

        await usuario.save();


        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log();
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisa logs'
        })
    }


}

const actualizarUsuarios = async(req, res = response) => {

    const uid = req.params.id;
    try {


        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario por ese id'
            })
        }

        const { password, google, email, ...campos } = req.body;

        console.log(usuarioDB.email + "-" + email);
        console.log(campos);
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'existe ya'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}


const borrarUsuarios = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);
        return res.status(200).json({
            ok: false,
            msg: "usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })

    }



}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}