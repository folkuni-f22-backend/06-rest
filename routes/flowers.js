import express from 'express'
import { getDb } from '../data/database.js'
import { isValidFlower, hasId, generateRandomId } from '../data/validate.js'

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
	let maybeId = Number(req.params.id)
	// Giltigt id får inte vara NaN och ska vara >= 0
	if (isNaN(maybeId) || maybeId < 0 ) {
		res.sendStatus(400)
		return
	}

	await db.read()
	let maybeFlower = db.data.flowers.find(flower => flower.id === maybeId)
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


// TODO
//   PUT /resource/:id

//   DELETE /resource/:id
router.delete('/:id', async (req, res) => {
	// Kontrollera att id är giltigt
	let maybeId = Number(req.params.id)
	// Giltigt id får inte vara NaN och ska vara >= 0
	if (isNaN(maybeId) || maybeId < 0) {
		res.sendStatus(400)
		return
	}

	await db.read()
	let maybeFlower = db.data.flowers.find(flower => flower.id === maybeId)
	if (!maybeFlower) {
		res.sendStatus(404)
		return
	}

	db.data.flowers = db.data.flowers.filter(flower => flower.id !== maybeId)
	await db.write()
	res.sendStatus(200)
})



export default router
