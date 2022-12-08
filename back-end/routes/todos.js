const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')

router.get('/', todosController.getAllTodos)
router.post('/', todosController.newTodo)

router.get('/:id', todosController.getTodo)
router.delete('/:id', todosController.deleteTodo)
router.put('/:id', todosController.updateTodo)

module.exports = router