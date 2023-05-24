import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

// Alla URL börjar med "/api/flowers"
router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.flowers)
	// res.status(200).send(plants)
})




export default router
