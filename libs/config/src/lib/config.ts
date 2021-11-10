import { get } from 'lodash'
type EnvarValue = string | number | boolean | Record<string, any>

export const config = (source: Record<string, any>): ((path: string) => EnvarValue) => {
	return (path: string) => {
		return get(source, path)
	}
}
