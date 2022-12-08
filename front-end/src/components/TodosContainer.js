import { useState } from "react";
import Todo from "./Todo";
import TodosFilter from "./TodosFilter";
import TodosLeftStatus from "./TodosLeftStatus";

const TodosContainer = ({ todos, deleteTodo, deleteCompletedTodos, editTodo }) => {
	const [todosFilter, setTodosFilter] = useState('All')

	const FILTER_MAP = {
		All: () => true,
		Active: todo => !todo.completed,
		Completed: todo => todo.completed
	};

	return (
		<>
			<main>
				<div className='todos-container'>
					{todos
						.filter(FILTER_MAP[todosFilter])
						.map(todo => {
							return <Todo todoInfo={todo} key={todo.id} deleteTodo={deleteTodo} editTodo={editTodo} />
						})
					}
					<TodosLeftStatus todos={todos} removeCompletedTodos={deleteCompletedTodos} todosFilter={todosFilter} setTodosFilter={setTodosFilter} />
				</div>
			</main>
			<TodosFilter todosFilter={todosFilter} setTodosFilter={setTodosFilter} container='mobile' />
		</>
	)
}

export default TodosContainer;