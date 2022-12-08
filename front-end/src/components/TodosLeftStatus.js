import { useEffect, useState } from "react"
import TodosFilter from "./TodosFilter"

const CompletedStatus = ({ todos, removeCompletedTodos, todosFilter, setTodosFilter }) => {
	const [todosLeft, setTodosLeft] = useState(0)

	useEffect(() => {
		const todosLeftArray = todos.filter(todo => todo.completed === false)
		setTodosLeft(todosLeftArray.length)
	}, [todos])


	return (
		<div className='status-container'>
			<span className='items-left'>{todosLeft} items left</span>
			<TodosFilter todosFilter={todosFilter} setTodosFilter={setTodosFilter} container='desktop' />
			<button className='clear-button' onClick={() => removeCompletedTodos()}>Clear Completed</button>
		</div>
	)
}

export default CompletedStatus