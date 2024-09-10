interface API_ERROR {
	statusCode: number
	message: string
}

// SUCCESS: 200-299 ------------------------------------

export function STATUS_OK() {
	return { statusCode: 200, message: 'OK' }
}

// CLIENT ERRORS: 400-499 ------------------------------

export function BAD_REQUEST(message = 'Bad Request'): API_ERROR {
	return { statusCode: 400, message }
}

export function NOT_FOUND(message = 'Not Found'): API_ERROR {
	return { statusCode: 404, message }
}

// SERVER ERRORS: 500-599 ------------------------------

export function INTERNAL_SERVER_ERROR(message = 'Internal Server Error'): API_ERROR {
	return { statusCode: 500, message }
}
