import { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import Header from './components/Header';
import TodosContainer from './components/TodosContainer';
import todoService from './services/todos'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		todoService
			.getAll()
			.then(initialTodos => {
				setTodos(initialTodos)
			})
	}, []);

	const addTodo = (todoObject) => {
		try {
			todoService
			.create(todoObject)
			.then(returnedTodo => {
				setTodos(todos.concat(returnedTodo))
				toast.success('New todo added!', {
					theme: "colored"
				})
			})
		} catch (error) {
			console.error(error)
			toast.error('Error adding todo', {
					theme: "colored"
				})
		}
	}

	const removeTodo = id => {
		try {
			todoService.remove(id)
			setTodos(prevState => prevState.filter(todo => todo.id !== id));
			toast.info('Todo Removed!', {
					theme: "colored"
				})
		} catch (error) {
			console.error(error)
			toast.error('Error removing todo', {
					theme: "colored"
				})
		}
	}

	const removeCompletedTodos = () => {
		const removeSingleTodo = id => {
			todoService.remove(id)
			setTodos(prevState => prevState.filter(todo => todo.id !== id))
		}
		try {
			todos.map(todo => (todo.completed === false) ? todo : removeSingleTodo(todo.id))
			toast.info('All completed todos removed!', {
					theme: "colored"
				})
		} catch (error) {
			console.error(error)
			toast.error('Error deleting completed todos', {
					theme: "colored"
				})
		}
	}

	const updateTodo = (id, todoContent, todoCompleted) => {
		const updatedTodo = {
			content: todoContent,
			completed: todoCompleted
		}
		try {
			todoService
			.update(id, updatedTodo)
			.then(returnedTodo => {
				setTodos(prevState => prevState.map(todo => (todo.id !== returnedTodo.id) ? todo : returnedTodo))
			})
		} catch (error) {
			console.error(error)
		}
	}

	const completeTodos = check => {
		todos.map(todo => updateTodo(todo.id, todo.content, check))
	}

	return (
		<div className="App">
			<Header todos={todos} createTodo={addTodo} completeTodos={completeTodos} />
			<TodosContainer todos={todos} deleteTodo={removeTodo} deleteCompletedTodos={removeCompletedTodos} editTodo={updateTodo} />
			<ToastContainer autoClose={3000} transition={Slide} pauseOnFocusLoss={false} pauseOnHover={false} hideProgressBar={true} />
		</div>
	);
}

export default App;
