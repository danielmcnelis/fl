import { Model, ModelJSON } from './Model'
import { Knex } from 'knex'
import { Context } from '@fl/context'
import { uclid } from '@fl/ids'

export interface CreatedJSON extends UpdatedJSON {
	createdAt: Date
}

export interface UpdatedJSON {
	id: string
	updatedAt: Date
}

export class KnexModel extends Model {
	protected static tableName: string
	protected tableName: string

	constructor(tableName: string, data: ModelJSON) {
		super(data)
		this.tableName = tableName
	}

	static async create(data: Record<string, any>, context: Context): Promise<Record<string, any> & CreatedJSON> {
		const now = new Date()
		const id = data?.id || uclid()
		const newOne = { id, createdAt: now, updatedAt: now, ...data }

		return context.knexConnector
			.from(this.tableName)
			.insert(newOne)
			.then(({ rowCount }: Record<string, any>) => {
				console.log('rowCount', rowCount)
				return rowCount === 1 ? newOne : null
			})
	}

	static async findOne(where: ModelJSON, context: Context): Promise<ModelJSON> {
		const rows = await context.knexConnector.from(this.tableName).where(where).limit(1)
		return rows.map((r) => ({
			...r
		}))[0]
	}

	static async findMany(where: ModelJSON, context: Context): Promise<ModelJSON[]> {
		const rows = await context.knexConnector.from(this.tableName).where(where)
		return rows.map((r) => ({
			...r
		}))
	}
}
