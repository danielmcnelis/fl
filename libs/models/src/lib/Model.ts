
import { get as lget, set as lset } from 'lodash'

export type ModelJSON = Record<string, any> /* eslint-disable-line */
export type ModelValue = null | boolean | number | number[] | string | string[] | ModelJSON

export class Model {
	protected _data:ModelJSON
	constructor(data:ModelJSON) {
        this._data = data
    }
	get data():ModelJSON {
		return this._data
	}
	set data(data:ModelJSON) {
		this._data = data
	}
	set(path:string, value:ModelValue) {
		lset(this._data, path, value)
	} 
	get(path:string):ModelValue {
		return lget(this._data, path)
	} 
	toJSON():ModelJSON {
		return this._data
	}
}

