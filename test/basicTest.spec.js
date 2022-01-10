require('dotenv').config()
const assert = require('assert');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const url = `http://localhost:3028/usuarios/createUser`;


// describe(`Prueba basica de api`,() => {
//     it(`Api responde con status 200`, async () => {
//         const Url = `https://jsonplaceholder.typicode.com/todos/1`;
//         await fetch(Url)
//         .then(response => {
//             assert.equal(response.status, 200)
//         })
//     });
// });

let userTest = {
    username: 'leanss',
    name: 'leanss',
    email: 'lean@gmail.com',
    tel: '1234567890',
    address: '108',
    password: '0303'
}

describe(`Test de Registro de Usuarios`, () => {
    it(`Usuario registrado`, async () => {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userTest)
        })
            .then(response => {response.json()
                assert.equal(response.status, 200);
            })
    });
})

