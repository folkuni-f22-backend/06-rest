import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

// Dessa endpoints behöver byggas för att vi ska ha ett RESTful API
// x GET /resource
//   GET /resource/:id
//   POST /resource
//   PUT /resource/:id
//   DELETE /resource/:id


// Alla URL börjar med "/api/flowers"
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.flowers)
	// res.status(200).send(plants)
})	

// TODO: ni får jobba med GET /resource/:id

router.post('/', async(req, res) => {
	let maybeFlower = req.body
	console.log('Felsöker POST: maybe=', maybeFlower)

	// Validera body (maybeFlower)
	// Om okej, lägg till i databasen och svara med status 200
	// Om inte okej, 400 (bad request)
	if( isValidFlower(maybeFlower) ) {
		console.log('Felsöker POST: is valid')
		await db.read()
		maybeFlower.id = generateRandomId()
		db.data.flowers.push(maybeFlower)
		await db.write()
		res.sendStatus(200)

	} else {
		console.log('Felsöker POST: invalid')
		res.sendStatus(400)
	}
})

// Två alternativ för id:
// 1. skapa slumpat id
// 2. leta upp det högsta id som finns i db, +1
function generateRandomId() {
	return Math.round(Math.random() * 1000000000)
}

function isValidFlower(f) {
	// console.log('isValidFlower 1');
	// Är f ett objekt över huvud taget?
	// Tips: Object.keys
	if( (typeof f) !== 'object' ) {
		return false
	} else if( f === null ) {
		return false
	}

	// console.log('isValidFlower 2');
	// Ett flower-objekt innehåller egenskaperna:
	// id: number, name: string, latin: string, english: string
	// Obs! id används inte när vi POST:ar ett nytt objekt
	// Affärslogik == vilka villkor måste gälla för värdet på varje egenskap
	
	let nameIsValid = (typeof f.name) === 'string'
	nameIsValid = nameIsValid && f.name !== ''
	// TODO: latin och english
	
	if( !nameIsValid ) {
		return false
	}
	// console.log('isValidFlower 3');
	return true
}
function hasId(object) {
	let idIsValid = (typeof object.id) === 'number'
	idIsValid = idIsValid && object.id >= 0
	return idIsValid
}


export default router
