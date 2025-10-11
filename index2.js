


const crypto = require('crypto');

// Genera 16 bytes aleatorios y los convierte a hexadecimal
const randomHex = crypto.randomBytes(16).toString('hex');

console.log(randomHex); // Ejemplo de salida: e4d3f6a7c8b9d1e2f3a4b5c6d7e8f901
