const { Client } = require('pg')

const client = new Client({
	HOST: "localhost",
	PORT: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'admin123'
})

client.connect((err) => {
	if (err) {
		console.log('error connecting to the database');
	} else {
		console.log('connected');
	}
})

module.exports = client