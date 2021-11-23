import { Context, Next } from 'koa'

export interface StartupOptions {
	context?: () => Promise<Context>
}

// Build context per request
export const startup = (options: StartupOptions) => async (ctx: Context, next: Next) => {
	// All Koa middleware are provided an arg `ctx` that represents the current request context.
	// That request context has a property `state` which they provide for adding custom data onto
	// the request context. So we will create our context and add it like this:
	console.log('startup()')
	const { context } = options
	ctx.state.context = context ? await context() : {}
	console.log('ctx.state', ctx.state)
	return next()
}

// Any middleware chained after would access our context as:
//
// const users = await const players = await Player.findMany({}, ctx.state.context)
