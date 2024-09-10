interface ErrorWithStatusCode extends Error {
	statusCode: number
}

function createError(statusCode: number, message: string) {
	const error = new Error(message) as ErrorWithStatusCode
	error.statusCode = statusCode
	return error
}

// CLIENT ERRORS: 400-499

function badRequestError(message = 'Bad Request') {
	return createError(400, message)
}

function notFoundError(message = 'Not Found') {
	return createError(404, message)
}

// SERVER ERRORS: 500-599

function internalServerError(message = 'Internal Server Error') {
	return createError(500, message)
}

// ---------------------

export { badRequestError, notFoundError, internalServerError }
