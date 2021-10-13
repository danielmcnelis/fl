import { Context, Next } from 'koa'

export const log = (options: Record<string, any> = {}) => async (ctx: Context, next: Next) => {
	const start = process.hrtime()
	return next()
		.then(() => {
			const delta = process.hrtime(start)
			const elapsed = Math.round(delta[0] * 1000 + delta[1] / 1000000)
			console.info(`${ctx.method} ${ctx.url} (${ctx.status}) [${elapsed}ms]`)
		})
		.catch(function (error) {
			const delta = process.hrtime(start)
			const elapsed = Math.round(delta[0] * 1000 + delta[1] / 1000000)
			console.error(
				`${ctx.method} ${ctx.url} (${ctx.status}) [${elapsed}ms] error: ${error.constructor.name} ${error.message}`
			)
			throw error
		})
}
