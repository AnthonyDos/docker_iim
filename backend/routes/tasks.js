const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');

router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.addTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;