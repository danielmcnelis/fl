import { KnexModel } from './KnexModel'
import { Context } from '@fl/context'
import bcrypt from 'bcrypt'

interface UserJSON {
	id?: string
	email?: string
	displayname?: string
	username?: string
	passwordHash?: string
	createdAt?: Date
	updatedAt?: Date
}

export class User extends KnexModel {
	protected static readonly tableName: string = 'users'

	constructor(data: UserJSON) {
		super(User.tableName, data)
	}

	static async existsByEmail(email: string, context: Context): Promise<boolean> {
		return context.knexConnector
			.from(this.tableName)
			.where({ email })
			.count('id')
			.first()
			.then(({ count }: Record<string, any>) => {
				count = parseInt(count, 10)
				console.log('count', count)
				console.log('typeof count', typeof count)
				console.log('count > 0', count > 0)
				return count > 0
			})
	}

	static async findById(id: string, context: Context): Promise<UserJSON> {
		const rows = await context.knexConnector.from(this.tableName).where({ id }).limit(1)
		return rows.map((r) => ({
			...r
		}))[0]
	}

	static async $findById(id: string, context: Context): Promise<User> {
		const row = await User.findById(id, context)
		return new User(row)
	}

	static async register(email: string, password: string, displayname: string, context: Context): Promise<UserJSON> {
		const COST = 12
		const passwordHash = password ? await bcrypt.hash(password, COST) : null
		console.log('passwordHash', passwordHash)
		const user = await User.create({ email, passwordHash, username: email, displayname }, context)
		console.log('user', user)
		return user
	}

	get id(): string {
		return this.get('id') as string
	}

	get email(): string {
		return this.get('email') as string
	}

	get displayname(): string {
		return this.get('displayname') as string
	}

	get username(): string {
		return this.get('username') as string
	}

	get createdAt(): Date {
		return this.get('createdAt') as Date
	}

	get updatedAt(): Date {
		return this.get('updatedAt') as Date
	}
}
