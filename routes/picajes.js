const { Router } = require('express');

const { 
    ComprobarDni,
    InsertarPicaje,
    Status,
    CargarRegistros,
    Keepalive

} = require('../controllers/picajes');


const router = Router();

router.get('/ComprobarDni/', ComprobarDni );
router.get('/InsertarPicaje/', InsertarPicaje );
router.get('/Status/', Status );
router.get('/CargarRegistros/', CargarRegistros );
router.get('/Keepalive/', Keepalive );




module.exports = router;


