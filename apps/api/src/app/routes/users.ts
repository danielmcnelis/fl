import KoaRouter from 'koa-router'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { users } from '../middleware'
import { log, error, startup } from '@fl/middleware'
import { context } from '../context'

const router = new KoaRouter<DefaultState, KoaContext>()

router.get('/users', log(), error(), startup({ context }), users())
router.get('/users/:id', log(), error(), startup({ context }), users())
export default router
