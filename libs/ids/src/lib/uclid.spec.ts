import {
	uclid,
	parseUclid,
	uclidFromIds,
	idsFromUclid,
	uclidFromUuid,
	uuidFromUclid,
	uclidFromPushid,
	pushidFromUclid
} from './uclid'

/* uclid
 */
test('uclid format', () => {
	expect(uclid()).toMatch(/[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{22}/)
})

test('uclid format', () => {
	expect(parseUclid(uclid(new Date('2020-11-25T00:40:56.943Z').getTime()))['time'].getTime()).toEqual(
		new Date('2020-11-25T00:40:56.943Z').getTime()
	)
})

test('uclid format', () => {
	const payload = Buffer.alloc(10, '0')
	payload.writeBigUInt64BE(BigInt(12345678), 0)
	expect(parseUclid(uclid(new Date('2020-11-25T00:40:56.943Z').getTime(), payload))['payload']).toEqual(payload)
})

/* parseUclid
 */
test('parseUclid', () => {
	expect(parseUclid('1BTrbDMxXHhWw6M3FgbDLJ')).toEqual({
		time: new Date('2020-11-25T00:40:56.943Z'),
		payload: Buffer.from('772f164b76cb99a4fb0f', 'hex')
	})
})

/* uclidFromIds
 */
test('uclidFromIds', () => {
	expect(uclidFromIds(3818712, 16429)).toEqual('11115rVdmaxmsQrZco9dou')
})

/* idsFromUclid
 */
test('idsFromUclid', () => {
	expect(idsFromUclid('11115rVdmaxmsQrZco9dou')).toEqual({
		primary: 3818712,
		secondary: 16429
	})
})

/* uclidFromUuid
 */
test('uclidFromUuid', () => {
	expect(uclidFromUuid('3bbe6d2b-d5e2-4fda-8199-4b1e7cfebe80')).toEqual('8NtfHY2WKomoGVYaNNLM3M')
})

/* uuidFromUclid
 */
test('uuidFromUclid', () => {
	expect(uuidFromUclid('8NtfHY2WKomoGVYaNNLM3M')).toEqual('3bbe6d2b-d5e2-4fda-8199-4b1e7cfebe80')
})

/* uclidFromPushid
 */
test('uclidFromPushid', () => {
	expect(uclidFromPushid('-M9fZ4hfYAI4xY1q8vIg')).toEqual('113MGiVqbru7oxu2FKPWro')
})

/* pushidFromUclid
 */
test('pushidFromUclid', () => {
	expect(pushidFromUclid('113MGiVqbru7oxu2FKPWro')).toEqual('-M9fZ4hfYAI4xY1q8vIg')
})
