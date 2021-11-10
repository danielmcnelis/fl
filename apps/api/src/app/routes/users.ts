
import KoaRouter from 'koa-router'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { log, error, users } from '../middleware'

const router = new KoaRouter<DefaultState, KoaContext>()

router.get('/users', log(), error(), users())
router.get('/users/:id', log(), error(), users())

export default router