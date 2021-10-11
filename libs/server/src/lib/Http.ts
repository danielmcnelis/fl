import Koa from 'koa'
import Emitter from 'events'
import https from 'https'

interface HttpOpts {
	https: boolean
	key: string
	cert: string
	ca: string
}

class Http extends Emitter {
	private _koa = undefined
	private _https = false
	private _key = ''
	private _cert = ''
	private _ca = ''

	constructor(koa: Koa, options: HttpOpts) {
		super()
		this._koa = koa
		this._https = options.https
		this._key = options.key
		this._cert = options.cert
		this._ca = options.ca
	}

	listen(...args) {
		if (this._https) {
			return https
				.createServer(
					{
						key: this._key,
						cert: `${this._cert}\n${this._ca}`
					},
					this._koa.callback()
				)
				.listen(...args)
		} else {
			return this._koa.listen(...args)
		}
	}
}

export default Http
