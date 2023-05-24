import express from 'express'
import { getDb } from '../data/database.js'
import { isValidFlower, hasId, generateRandomId, isValidId } from '../data/validate.js'

const router = express.Router()
const db = getDb()

// Dessa endpoints behöver byggas för att vi ska ha ett RESTful API
// x GET /resource
// x GET /resource/:id
// x POST /resource
//   PUT /resource/:id
//   DELETE /resource/:id


// Alla URL börjar med "/api/flowers"
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.flowers)
	// res.status(200).send(plants)
})	


router.get('/:id', async (req, res) => {
	// Kontrollera att id är giltigt
	if( !isValidId(req.params.id) ) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeFlower = db.data.flowers.find(flower => flower.id === id)
	if( !maybeFlower ) {
		res.sendStatus(404)
		return
	}

	res.send(maybeFlower)
})



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


//   PUT /resource/:id
router.put('/:id', async (req, res) => {
	// Validera id
	if( !isValidId(req.params.id) ) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	// Validera body (flower object)
	if( !isValidFlower(req.body) || !hasId(req.body) ) {
		res.sendStatus(400)
		return
	}
	let newFlower = req.body
	
	// Finns blomman med samma id?
	// I så fall byt ut blom-objektet
	await db.read()
	let oldFlowerIndex = db.data.flowers.findIndex(flower => flower.id === id)
	if( oldFlowerIndex === -1 ) {
		res.sendStatus(404)
		return
	}

	db.data.flowers[oldFlowerIndex] = newFlower
	await db.write()
	res.sendStatus(200)
})


//   DELETE /resource/:id
router.delete('/:id', async (req, res) => {
	// Kontrollera att id är giltigt
	if (!isValidId(req.params.id)) {
		res.sendStatus(400)
		return
	}
	let id = Number(req.params.id)

	await db.read()
	let maybeFlower = db.data.flowers.find(flower => flower.id === id)
	if (!maybeFlower) {
		res.sendStatus(404)
		return
	}

	db.data.flowers = db.data.flowers.filter(flower => flower.id !== id)
	await db.write()
	res.sendStatus(200)
})



export default router
