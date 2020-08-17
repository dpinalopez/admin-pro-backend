const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/upload');
const expressfileUpload = require('express-fileupload');


const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;