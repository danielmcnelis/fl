
import KoaRouter from 'koa-router'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { health, log, error } from '../middleware'

const router = new KoaRouter<DefaultState, KoaContext>()

router.get('/health', log(), error(), health())

export default router