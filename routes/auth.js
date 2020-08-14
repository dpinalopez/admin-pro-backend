const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post('/', [
        check('password', 'El pass es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login
)

module.exports = router;