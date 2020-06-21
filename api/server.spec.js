//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../dbConfig');
const server = require('./server.js');

describe('Check the basics so were running correctly', () => {
    it('is in the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('can get "/"', () => {
        return request(server).get('/')
            .expect(200)
            .expect('content-type', /json/)
            .then(res => {
                expect(res.body.message).toBe("Server is up and running");
            });
    })
})

