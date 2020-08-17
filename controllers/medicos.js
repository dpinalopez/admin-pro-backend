const { response } = require('express');
const Medico = require('../models/medicos');

const getMedicos = async(req, res = response) => {


    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos: medicos
    })


    res.json({
        ok: true,
        msg: "getMedicos"
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    console.log(medico);

    try {

        const medicoDB = await medico.save();
        res.json({
            ok: false,
            medico: medicoDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: "actualizarMedico"
    })
}

const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: "borrarMedico"
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}