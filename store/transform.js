import { nanoid } from 'nanoid'

import books from './books.json'
function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

const random = getRandomArbitrary(10, 20)//?

const a = books.map(book => {
    return { ...book, id: nanoid(), price: getRandomArbitrary(5, 20), discount: getRandomArbitrary(10, 20) }
})
console.log(JSON.stringify(a));