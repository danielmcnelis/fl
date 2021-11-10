import Koa from 'koa'
import { config } from './config'
import { health, users } from './routes'

const app = new Koa()

const routes = { health, users }
Object.entries(routes).forEach(([path, route]) => {
	app.use(route.routes()).use(
		route.allowedMethods({
			throw: false,
			notImplemented: () => {
				throw new Error('not implemented')
			},
			methodNotAllowed: () => {
				throw new Error('method not allowed')
			}
		})
	)
	route.stack.forEach((route) =>
		console.log(`Mount ${path} on ${route.methods.filter((m) => m !== 'HEAD').join(',')} ${route.path}`)
	)
})

// app.use(health.routes())
// app.use(health.allowedMethods())
// app.use(users.routes())
// app.use(users.allowedMethods())

const databaseUrl = config('database.url')
console.log('databaseUrl', databaseUrl)
const poolMin = config('database.pool.min')
console.log('poolMin', poolMin)
const poolMax = config('database.pool.max')
console.log('poolMax', poolMax)

const port = config('service.port')
console.log('port', port)
//const port = process.env.PORT

const server = app.listen(port, () => {
	console.log(`Listening at http://0.0.0.0:${port}`)
})

//app.listen(3000)
