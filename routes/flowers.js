import express from 'express'
import { getDb } from '../data/database.js'
import { isValidFlower, hasId, generateRandomId } from '../data/validate.js'

const router = express.Router()
const db = getDb()

// Dessa endpoints behöver byggas för att vi ska ha ett RESTful API
// x GET /resource
//   GET /resource/:id
// x POST /resource
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
	// console.log('Felsöker POST: maybe=', maybeFlower)

	// Validera body (maybeFlower)
	// Om okej, lägg till i databasen och svara med status 200
	// Om inte okej, 400 (bad request)
	if( isValidFlower(maybeFlower) ) {
		// console.log('Felsöker POST: is valid')
		await db.read()
		maybeFlower.id = generateRandomId()
		db.data.flowers.push(maybeFlower)
		await db.write()
		res.sendStatus(200)

	} else {
		// console.log('Felsöker POST: invalid')
		res.sendStatus(400)
	}
})




export default router
