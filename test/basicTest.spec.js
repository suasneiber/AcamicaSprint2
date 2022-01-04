require('dotenv').config;
const jwt = require('jsonwebtoken');
const assert = require('assert');
const fetch = require('node-fetch');


describe(`Prueba basica de api`,() => {
    it(`Api responde con status 200`, async () => {
        const url = `http://localhost:3028/usuarios`;
        await fetch(url)
        .then(response => {
            assert.equal(response.status, 200)
        })
    });
});