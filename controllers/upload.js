const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-Imagen');
const fs = require('fs');

const fileUpload = (req, res) => {


    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es un medico, usuario u hospital"
        })
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No hay ningun archivo"
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');

    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValida = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValida.includes(extensionesValida)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extension permitida"
        });
    }

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'error el mover la imagen'
            })
        }
        actualizarImagen(tipo, id, nombreArchivo);


        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        })
    });

}

const retornaImagen = (req, res = response) => {
    console.log('hola');
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    console.log('ooo');
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        res.sendFile(pathImg);
    }


}

module.exports = {
    fileUpload,
    retornaImagen
}