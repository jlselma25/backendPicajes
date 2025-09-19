const { Router } = require('express');

const { 
    ComprobarDni,
    InsertarPicaje

} = require('../controllers/picajes');


const router = Router();

router.get('/ComprobarDni/', ComprobarDni );
router.get('/InsertarPicaje/', InsertarPicaje );


module.exports = router;


