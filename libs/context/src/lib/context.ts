import { Knex } from 'Knex'
type UserJson = Record<string, any>

export class Context {
	private _user: UserJson
	private _knexConnector: Knex

	constructor() {
		this.user = undefined
		this.knexConnector = undefined
	}

	get user(): UserJson {
		if (!this._user) throw new Error('no user')
		return this._user
	}

	set user(user: UserJson) {
		this._user = user
	}

	get hasUser(): boolean {
		return !!this._user
	}

	get knexConnector(): Knex {
		if (!this._knexConnector) throw new Error('no knexConnector')
		return this._knexConnector
	}

	set knexConnector(knexConnector: Knex) {
		this._knexConnector = knexConnector
	}

	get hasknexConnector(): boolean {
		return !!this._knexConnector
	}
}
