
import { Context as KoaContext, Next } from 'koa'

export const health = () => async (ctx: KoaContext, next: Next) => {
    ctx.body = {
        statusCode: 200,
        message: 'Healthy!'
    }
}