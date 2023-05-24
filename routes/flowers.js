import express from 'express'

const router = express.Router()

// Alla URL börjar med "/api/flowers"
router.get('/', (req, res) => {
	console.log('TODO')
	res.sendStatus(204)  // no content
})


// TODO: flytta datan till databas
const plants = [
  { id: 1, name: 'Maskros', latin: 'Taraxacum officinale', english: 'Dandelion' },
  { id: 2, name: 'Blåklocka', latin: 'Campanula rotundifolia', english: 'Harebell' },
  { id: 3, name: 'Smörblomma', latin: 'Trollius europaeus', english: 'Globe flower' },
  { id: 4, name: 'Gullviva', latin: 'Pulsatilla vulgaris', english: 'Pasque flower' },
  { id: 5, name: 'Rölleka', latin: 'Achillea millefolium', english: 'Yarrow' },
  { id: 6, name: 'Prästkrage', latin: 'Leucanthemum vulgare', english: 'Oxeye daisy' },
  { id: 7, name: 'Maskros', latin: 'Bellis perennis', english: 'Daisy' },
  { id: 8, name: 'Blåklocka', latin: 'Campanula persicifolia', english: 'Peach-leaved bellflower' },
  { id: 9, name: 'Smörblomma', latin: 'Ranunculus acris', english: 'Meadow buttercup' },
  { id: 10, name: 'Gullviva', latin: 'Primula veris', english: 'Cowslip' }
];


export default router
