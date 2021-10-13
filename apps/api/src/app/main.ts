
import Koa from 'koa'
import { health, players } from './routes'

const app = new Koa()

app.use(health.routes())
app.use(health.allowedMethods())
app.use(players.routes())
app.use(players.allowedMethods())
app.listen(3000)
