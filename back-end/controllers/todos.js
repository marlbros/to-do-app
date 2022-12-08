const Todo = require('../models/todo')

const getAllTodos = (req, res) => {
	Todo.find({}).then(todos => {
		res.json(todos.map(todo => todo.toJSON()))
	})
}

const getTodo = (req, res, next) => {
	Todo.findById(req.params.id)
		.then(todo => {
			if (todo) {
				res.json(todo.toJSON())
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
}

const newTodo = (req, res, next) => {
	const body = req.body
	const todo = new Todo({
		content: body.content,
		date: new Date(),
		completed: false,
	})
	todo.save()
		.then(savedTodo => {
			res.json(savedTodo.toJSON())
		})
		.catch(error => next(error))
}

const deleteTodo = (req, res, next) => {
	Todo.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
}

const updateTodo = (req, res, next) => {
	const body = req.body
	const todo = {
		content: body.content,
		completed: body.completed,
	}
	Todo.findByIdAndUpdate(req.params.id, todo, { new: true })
		.then(updatedTodo => {
			res.json(updatedTodo.toJSON())
		})
		.catch(error => next(error))
}

module.exports = {
	getAllTodos,
	getTodo,
	newTodo,
	deleteTodo,
	updateTodo
}