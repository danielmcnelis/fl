import { Knex, knex as connect } from 'knex'

interface KnexOptions {
	client?: string
	url?: string
	host?: string
	port?: number
	user?: string
	password?: string
	database?: string
	charset?: string
	logging?: boolean
	debug?: boolean
}

let instance: Knex

export const knex = ({
	client = 'pg',
	url,
	host,
	port,
	user,
	password,
	database,
	charset = 'utf8',
	debug = true
}: KnexOptions) => {
	if (!instance) {
		instance = connect({
			client: client,
			connection: url
				? url
				: {
						host,
						port,
						user,
						password,
						database,
						charset
				  },
			pool: {
				max: 10,
				min: 2
			},
			debug: debug
		})
	}

	return instance
}
