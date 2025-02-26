import app from './app'

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

// CREA UNA SERVERLESS FUNCTION QUE EJECUTE MI SERVER PARA SUBURKI A VER

export const handler = async (event: any, context: any) => {
	return app.handler(event, context)
}