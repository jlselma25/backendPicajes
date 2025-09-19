const { Router } = require('express');

const { 
    ComprobarDni,
    InsertarPicaje,
    Status

} = require('../controllers/picajes');


const router = Router();

router.get('/ComprobarDni/', ComprobarDni );
router.get('/InsertarPicaje/', InsertarPicaje );
router.get('/Status/', Status );


module.exports = router;


