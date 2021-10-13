
import KoaRouter from 'koa-router'
import { Context as KoaContext, DefaultContext, DefaultState, Middleware } from 'koa'
import { log, error, players } from '../middleware'

const router = new KoaRouter<DefaultState, KoaContext>()

router.get('/players', log(), error(), players())
router.get('/players/:id', log(), error(), players())

export default router