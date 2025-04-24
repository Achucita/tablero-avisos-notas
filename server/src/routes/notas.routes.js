const Router = require('koa-router');
const notasController = require('../controllers/notas.controller');

const router = new Router({ prefix: '/api/notas' });

router.get('/', notasController.getNotas);
router.get('/:id', notasController.getNotaById);
router.post('/', notasController.createNota);
router.put('/:id', notasController.updateNota);
router.delete('/:id', notasController.deleteNota);

module.exports = router;
