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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.params.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: "medico no encontrado"
            })
        }

        const cambiosMedico = {

            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: "medico no encontrado"
            })
        }

        await Medico.findOneAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico eliminado"
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}