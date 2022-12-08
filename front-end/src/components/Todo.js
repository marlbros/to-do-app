import { useEffect, useState } from 'react';
import iconCross from '../images/icon-cross.svg'

const Todo = ({ todoInfo, deleteTodo, editTodo }) => {
	const [checkbox, setCheckbox] = useState(todoInfo.completed)

	const handleChange = event => {
		setCheckbox(event.target.checked)
		editTodo(todoInfo.id, todoInfo.content, !checkbox)
	}

	useEffect(() => {
		setCheckbox(todoInfo.completed)
	}, [todoInfo])

	return (
		<form className='todo-container'>
			<span className='complete-checkbox-container'>
				<input type='checkbox' id={`todo-checkbox-${todoInfo.id}`} checked={checkbox} onChange={handleChange}></input>
				<label htmlFor={`todo-checkbox-${todoInfo.id}`}></label>
			</span>
			<p className={`todo-text ${checkbox ? 'completed' : ''}`}>{todoInfo.content}</p>
			<button className='delete-button' onClick={() => deleteTodo(todoInfo.id)}>
				<img className='delete-button-icon' src={iconCross} alt=''></img>
			</button>
		</form>
	)
}

export default Todo;