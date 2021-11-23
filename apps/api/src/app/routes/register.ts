import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { register } from '../middleware'
import { log, error, startup } from '@fl/middleware'
import { context } from '../context'

const router = new KoaRouter<DefaultState, KoaContext>()

router.post('/auth/register', log(), error(), koaBody(), startup({ context }), register())

export default router
