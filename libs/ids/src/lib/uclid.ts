import basex from 'base-x'
import { randomBytes } from 'crypto'

const base58 = basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

const TIME_MAX = Math.pow(2, 48) - 1
const TIME_LENGTH = 6 // Bytes (48 bits)
const PAYLOAD_LENGTH = 10 // Bytes (80 bits)
const UCLID_LENGTH = 16 // Bytes (128 bits)
const UCLID_ENCODED_LENGTH = 22

/*
 * UCLID
 *
 * Universally Unique Compact Lexicographically Sortable Identifier
 * 128-bit compatibility with UUID
 * 1.21e+24 unique ULIDs per millisecond
 * Lexicographically sortable!
 * Canonically encoded as a 22 character string, as opposed to the 36 character UUID
 * Uses Bitcoin's base58 for better efficiency and readability (6 bits per character) (URL safe)
 * Monotonic sort order (correctly detects and handles the same millisecond)
 */
export const uclid = (ms: number = Date.now(), payload?: Buffer): string => {
	ms = ms > TIME_MAX ? TIME_MAX : ms
	const bigint = Buffer.alloc(8)
	bigint.writeBigUInt64BE(BigInt(ms), 0)
	const time = bigint.slice(2, 8)
	payload = payload ?? randomBytes(PAYLOAD_LENGTH)
	const ulid = Buffer.concat([time, payload])
	return ('11111111' + base58.encode(ulid)).slice(-UCLID_ENCODED_LENGTH)
}

export const parseUclid = (str: string): { time: Date; payload: Buffer } => {
	if (str.length !== UCLID_ENCODED_LENGTH) throw new Error('Invalid uclid')
	const ulid = base58.decode(str).slice(-UCLID_LENGTH)
	const time = ulid.slice(0, TIME_LENGTH)
	const payload = ulid.slice(TIME_LENGTH, UCLID_LENGTH)
	const pad = Buffer.alloc(2)
	const bigint = Buffer.concat([pad, time])
	const ms = Number(bigint.readBigUInt64BE(0))
	return {
		time: new Date(ms),
		payload
	}
}

export const uclidFromIds = (primary: number, secondary = 0): string => {
	const bigint = Buffer.alloc(10, '0')
	bigint.writeBigUInt64BE(BigInt(secondary), 0)
	return uclid(primary, bigint)
}

export const idsFromUclid = (str: string): { primary: number; secondary: number } => {
	const { time, payload } = parseUclid(str)
	const primary = time.getTime()
	const secondary = Number(payload.readBigUInt64BE(0))

	return {
		primary,
		secondary
	}
}

export const uclidFromUuid = (uuid: string): string => {
	return ('11111111' + base58.encode(Buffer.from(uuid.replace(/\-/g, ''), 'hex'))).slice(-UCLID_ENCODED_LENGTH)
}

export const uuidFromUclid = (uclid: string): string => {
	const hex = base58.decode(uclid).toString('hex').slice(-32)
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

// Firebase PushID

const basePushid = basex('-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz')

// const PUSHID_TIME_MAX = Math.pow(2, 54) - 1
// const PUSHID_TIME_LENGTH = 7 // Bytes (54 bits)
// const PUSHID_PAYLOAD_LENGTH = 9 // Bytes (72 bits)
// const PUSHID_LENGTH = 16 // Bytes (128 bits)
const PUSHID_ENCODED_LENGTH = 20

export const uclidFromPushid = (str: string): string => {
	const pushid = basePushid.decode(str).slice(-PUSHID_ENCODED_LENGTH)
	return ('11111111' + base58.encode(pushid)).slice(-UCLID_ENCODED_LENGTH)
}

export const pushidFromUclid = (str: string): string => {
	const uclid = base58.decode(str).slice(-UCLID_ENCODED_LENGTH)
	return ('11111111' + basePushid.encode(uclid)).slice(-PUSHID_ENCODED_LENGTH)
}
