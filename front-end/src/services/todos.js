import axios from 'axios'

const baseUrl = '/api/todos'

const getAll = async () => {
	const request = axios.get(baseUrl)
	const response = await request
	return response.data
}

const create = async newObject => {
	const response = await axios.post(baseUrl, newObject)
	return response.data
}

const update = async (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	const response = await request
	return response.data
}

const remove = async id => {
	const request = axios.delete(`${baseUrl}/${id}`)
	const response = await request
	return response.data
}

const todoService = {
	getAll,
	create,
	update,
	remove
}

export default todoService