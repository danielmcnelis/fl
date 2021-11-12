import { Context as KoaContext, Next } from 'koa'
import { User } from '@fl/models'
import { knex } from '@fl/connectors'

import { Context } from '@fl/context'
import { config } from '../config'

const context = new Context()
context.user = { id: 1 }
context.knexConnector = knex({
	//url: config('database.url')
	url: process.env.DATABASE_URL
})

// const connector = knex({
// 	url: process.env.DATABASE_URL
// })

export const users = () => async (ctx: KoaContext, next: Next) => {
	const { id } = ctx.params
	if (id) {
		const user = await User.$findById(id, context)
		ctx.body = {
			statusCode: 200,
			data: user
		}
	} else {
		const users = await User.findMany({}, context)
		ctx.body = {
			statusCode: 200,
			data: users
		}
	}
}
