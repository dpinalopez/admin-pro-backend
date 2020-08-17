const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    console.log(tipo);
    switch (tipo) {
        case "medico":
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

            pathViejo = `./uploads/medico/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            console.log(medico);
            await medico.save();
            return true;
            break;
        case "hospital":

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            pathViejo = `./uploads/hospital/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            console.log(hospital);
            await hospital.save();
            return true;
            break;
        case "usuario":

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            pathViejo = `./uploads/usuario/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            console.log(usuario);
            await usuario.save();
            return true;
            break;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}