
import { KnexModel } from './KnexModel'
import { Knex } from 'knex'
import { ModelJSON } from './Model'

interface UserJSON {
    id?:string
    email?:string
    displayname?:string
    username?:string
    passwordHash?:string
    createdAt?:Date
    updatedAt?:Date
}

export class User extends KnexModel {
	protected static readonly tableName: string = 'users'
    
    constructor(data:UserJSON) {
        super(User.tableName, data)
    }

	static async findById(id:string, connector: Knex): Promise<UserJSON> {
		const rows = await connector.from(this.tableName).where({ id }).limit(1)
		return rows.map((r) => ({
			...r
		}))[0]
	}

	static async $findById(id:string, connector: Knex): Promise<User> {
		const row = await User.findById(id, connector)
        return new User(row)
	}

	get id():string {
        return this.get("id") as string
	}

	get email():string {
        return this.get("email") as string
	}

	get displayname():string {
        return this.get("displayname") as string
	}

	get username():string {
        return this.get("username") as string
	}

	get createdAt():Date {
        return this.get("createdAt") as Date
	}

	get updatedAt():Date {
        return this.get("updatedAt") as Date
	}
}