// server/src/routes/notas.routes.js
const Router = require('koa-router');
const NotasController = require('../controllers/notas.controller');

const router = new Router({ prefix: '/api/notas' });

// Rutas para las operaciones CRUD
router.get('/', NotasController.getAll);
router.get('/:id', NotasController.getById);
router.post('/', NotasController.create);
router.put('/:id', NotasController.update);
router.delete('/:id', NotasController.delete);

module.exports = router;
