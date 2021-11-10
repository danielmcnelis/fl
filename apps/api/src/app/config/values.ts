import { envarNumber, envarString } from '@fl/config'

export const values = {
	database: {
		url: envarString('DATABASE_URL', true),
		pool: {
			min: 2,
			max: 10
		}
	},
	service: {
		port: envarNumber('PORT', false, 8888)
	}
}
