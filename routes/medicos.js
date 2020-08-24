const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');



const router = Router();


router.get('/', getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hospital id debe ser valido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hospital id debe ser valido').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', borrarMedico);



module.exports = router;