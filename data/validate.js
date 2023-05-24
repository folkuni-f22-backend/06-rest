
function isValidFlower(f) {
	// console.log('isValidFlower 1');
	// Är f ett objekt över huvud taget?
	// Tips: Object.keys
	if ((typeof f) !== 'object') {
		return false
	} else if (f === null) {
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

	if (!nameIsValid) {
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

// Två alternativ för id:
// 1. skapa slumpat id
// 2. leta upp det högsta id som finns i db, +1
function generateRandomId() {
	return Math.round(Math.random() * 1000000000)
}


export { isValidFlower, hasId, generateRandomId }
