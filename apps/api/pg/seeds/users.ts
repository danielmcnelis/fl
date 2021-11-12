import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('users').del()

	// Inserts seed entries
	await knex('users').insert([
		{
			id: 1,
			email: 'dwm253@gmail.com',
			displayname: 'Dan',
			username: 'Dan',
			passwordHash: '123poeiruigfhojpdfv',
			updatedAt: new Date().toLocaleString('en-US'),
			createdAt: new Date().toLocaleString('en-US')
		},
		{
			id: 2,
			email: 'goat.controller@gmail.com',
			displayname: 'Jazzy J Jazzington',
			username: 'Daniel',
			passwordHash: 'u7gsdfu38388redas',
			updatedAt: new Date().toLocaleString('en-US'),
			createdAt: new Date().toLocaleString('en-US')
		},
		{
			id: 3,
			email: 'daniel.mcnelis@icloud.com',
			displayname: 'Hotdog',
			username: 'Danny',
			passwordHash: '9ty78fewuibkdfjuo234',
			updatedAt: new Date().toLocaleString('en-US'),
			createdAt: new Date().toLocaleString('en-US')
		}
	])
}
