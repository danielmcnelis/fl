import { Context as KoaContext, Next } from 'koa'
import { User } from '@fl/models'

export const register =
	(options: Record<string, any> = {}) =>
	async (ctx: KoaContext, next: Next) => {
		const { email, password, displayName } = ctx.request.body
		const { context } = ctx.state

		if (await User.existsByEmail(email, context)) {
			// find existing user by email
			// throw error if found

			throw new Error('Email already exists')
		}

		// generate id
		// hash password
		// create user in database

		const user = await User.register(email, password, displayName, context)
		console.log('user', user)

		ctx.body = {
			statusCode: 200,
			data: user
		}

		return next()
	}
