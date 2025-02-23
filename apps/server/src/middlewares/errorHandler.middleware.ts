import type { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
	statusCode?: number
}

export function errorHandlerMiddleware(
	err: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'

	return res.status(statusCode).json({
		message: `${statusCode} ${message}`,
		statusCode,
	})
}
