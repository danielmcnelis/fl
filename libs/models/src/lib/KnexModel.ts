import { Model, ModelJSON } from './Model'
import { Context } from '@fl/context'

export class KnexModel extends Model {
	protected static tableName: string
	protected tableName: string

	constructor(tableName: string, data: ModelJSON) {
		super(data)
		this.tableName = tableName
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
