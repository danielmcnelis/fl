import { Context } from '@fl/context'
import { knex } from '@fl/connectors'

export const context = async (): Promise<Context> => {
	const instance = new Context()
	instance.knexConnector = knex({
		//url: config('database.url')
		url: process.env.DATABASE_URL
	})

	return instance
}
