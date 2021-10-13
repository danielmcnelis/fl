
import { Context as KoaContext, Next } from 'koa'
import { knex, Player } from "@fl/models"

const connector = knex({
    url: process.env.DATABASE_URL
})

export const players = () => async (ctx: KoaContext, next: Next) => {
    const { id } = ctx.params
    if (id) {
        const player = await Player.$findById(id, connector)
        console.log('player', player)
        console.log('player.id', player.id)
        console.log('player.name', player.name)
        console.log('player.updatedAt', player.updatedAt)
        console.log('typeof player.updatedAt', typeof player.updatedAt)
        console.log('player.updatedAt instance of Date', player.updatedAt instanceof Date)
        ctx.body = {
            statusCode: 200,
            data: player
        }
    } else {
        const players = await Player.findMany({}, connector)
        console.log('players', players)
        ctx.body = {
            statusCode: 200,
            data: players
        }
    }
}