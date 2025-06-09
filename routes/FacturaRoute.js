const express = require('express');
const router = express.Router();
const FacturaController = require('../controllers/FacturaController');

router.post('/', FacturaController.crear);
router.get('/', FacturaController.obtenerTodas);
router.get('/:id', FacturaController.obtenerPorId);
router.put('/:id', FacturaController.actualizar);

module.exports = router;
