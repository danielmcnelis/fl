import KoaRouter from 'koa-router'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { health } from '../middleware'
import { log, error } from '@fl/middleware'

const router = new KoaRouter<DefaultState, KoaContext>()

router.get('/health', log(), error(), health())

export default router
