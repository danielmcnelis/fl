
import { KnexModel } from './KnexModel'
import { Knex } from 'knex'
import { ModelJSON } from './Model'

interface PlayerJSON {
    id?:string
    name?:string
    tag?:string
    duelingBook?:string
    createdAt?:Date
    updatedAt?:Date
}

export class Player extends KnexModel {
	protected static readonly tableName: string = 'players'
    
    constructor(data:PlayerJSON) {
        super(Player.tableName, data)
    }

	static async findById(id:string, connector: Knex): Promise<PlayerJSON> {
		const rows = await connector.from(this.tableName).where({ id }).limit(1)
		return rows.map((r) => ({
			...r
		}))[0]
	}

	static async $findById(id:string, connector: Knex): Promise<Player> {
		const row = await Player.findById(id, connector)
        return new Player(row)
	}

	get id():string {
        return this.get("id") as string
	}

	get name():string {
        return this.get("name") as string
	}

	get updatedAt():Date {
        return this.get("updatedAt") as Date
	}
}