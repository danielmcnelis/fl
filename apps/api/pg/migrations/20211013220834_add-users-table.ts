
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('users').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.string('id', 22).notNullable().primary()
                table.string('email', 128).notNullable()
                table.string('displayname', 128).nullable().defaultTo(null)
                table.string('username', 128).notNullable()
                table.string('passwordHash', 72).notNullable()
                table.timestamp('createdAt').defaultTo(knex.fn.now())
                table.timestamp('updatedAt').defaultTo(knex.fn.now())
                table.unique(['email'], 'email')
                table.unique(['username'], 'username')
                return table
            })
        }
        return
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('users').then((exists) => {
        if (exists) {
            return knex.schema.dropTable('users')
        }
        return
    })
}