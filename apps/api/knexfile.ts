// tslint:disable-next-line
require('dotenv').config({ path: '../../.env' })
import { knex as connect } from 'knex'

module.exports = async () => {
	const config = {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './pg/migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: './pg/seeds'
		}
	}

	// const knex = connect(config)
	// await knex.raw('CREATE DATABASE IF NOT EXISTS ??', process.env.DATABASE_URL)

	return {
		default: {
			...config,
			connection: process.env.DATABASE_URL
		}
	}
}
