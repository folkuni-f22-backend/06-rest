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

router.post('/', (req, res) => {
	let maybeFlower = req.body

	// Validera body (maybeFlower)
	// Om okej, lägg till i databasen och svara med status 200
	// Om inte okej, 400 (bad request)
	if( isValidFlower(maybeFlower) ) {
		// TODO: lägg till i databasen och skicka statuskoden 200
	} else {
		// TODO: skicka bara statuskoden 400
	}
})

function isValidFlower(f) {
	// Är f ett objekt över huvud taget?
	// Tips: Object.keys
	if( (typeof f) !== 'object' ) {
		return false
	} else if( f === null ) {
		return false
	}

	// Ett flower-objekt innehåller egenskaperna:
	// id: number, name: string, latin: string, english: string
	// Affärslogik == vilka villkor måste gälla för värdet på varje egenskap
	let idIsValid = (typeof f.id) === 'number'
	idIsValid = idIsValid && f.id >= 0
	let nameIsValid = (typeof f.name) === 'string'
	nameIsValid = nameIsValid && f.name !== ''
	// TODO: latin och english
	
	if( !idIsValid || !nameIsValid ) {
		return false
	}
	return true
}


export default router
