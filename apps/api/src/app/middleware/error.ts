import { Context, Next } from 'koa'
import statuses from 'statuses'

export const error = (options: Record<string, any> = {}) => async (ctx: Context, next: Next) => {
	try {
		await next()
	} catch (err) {
		const code = Number(err.code) || 500
		const status = statuses[code]
		const error = err.name ? err.name : 'Error'
		const message = err.message
		const extensions = err.extensions
		ctx.status = code
		ctx.type = 'application/json'
		ctx.body = {
			code: code,
			status: status,
			error: error,
			message: message,
			extensions: extensions
		}
		console.error(`${error}: ${message}: stack: ${JSON.stringify(err.stack)}`)
	}
}
