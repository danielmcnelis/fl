
import { Context as KoaContext, Next } from 'koa'
import { knex, User } from "@fl/models"

const connector = knex({
    url: process.env.DATABASE_URL
})

export const users = () => async (ctx: KoaContext, next: Next) => {
    const { id } = ctx.params
    if (id) {
        const user = await User.$findById(id, connector)
        console.log('user', user)
        console.log('user.id', user.id)
        console.log('user.username', user.username)
        console.log('user.displayname', user.displayname)
        console.log('user.createdAt', user.createdAt)
        console.log('user.updatedAt', user.updatedAt)
        ctx.body = {
            statusCode: 200,
            data: user
        }
    } else {
        const users = await User.findMany({}, connector)
        console.log('users', users)
        ctx.body = {
            statusCode: 200,
            data: users
        }
    }
}