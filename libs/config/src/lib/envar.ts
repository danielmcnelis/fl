export const envarString = (envar: string, required?: boolean, fallback?: string): string => {
	const value = process.env[envar]
	if (required && !value) throw new Error(`Missing required envarString: ${envar}`)
	if (!value) return fallback
	return value
}

export const envarNumber = (envar: string, required?: boolean, fallback?: number): number => {
	const value = process.env[envar]
	if (required && !value) throw new Error(`Missing required envarNumber: ${envar}`)
	if (!value) return fallback
	return parseInt(value, 10)
}

export const envarBoolean = (envar: string, required?: boolean, fallback?: boolean): boolean => {
	const value = process.env[envar]
	if (required && !value) throw new Error(`Missing required envarBoolean: ${envar}`)
	if (!value) return fallback
	return value.toLowerCase() === 'true' || value.toLowerCase() === '1'
}

export const envarJson = (envar: string, required?: boolean, fallback?: Record<string, any>): Record<string, any> => {
	const value = process.env[envar]
	if (required && !value) throw new Error(`Missing required envarJson: ${envar}`)
	if (!value) return fallback
	return JSON.parse(value)
}
