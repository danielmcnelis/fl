import { Knex } from 'knex'
import { knex } from './knex'
import { Model, ModelJSON } from './Model'

export class KnexModel extends Model {
	protected static tableName: string
	protected tableName: string

	constructor(tableName: string, data: ModelJSON) {
		super(data)
		this.tableName = tableName
	}

	static async findOne(where: ModelJSON, connector: Knex): Promise<ModelJSON> {
		const rows = await connector.from(this.tableName).where(where).limit(1)
		return rows.map((r) => ({
			...r
		}))[0]
	}

	static async findMany(where: ModelJSON, connector: Knex): Promise<ModelJSON[]> {
		const rows = await connector.from(this.tableName).where(where)
		return rows.map((r) => ({
			...r
		}))
	}
}
