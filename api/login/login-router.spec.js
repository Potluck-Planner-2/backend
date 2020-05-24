//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const LoginRouter = require('./login-router');


server.use('/api/login', LoginRouter);

describe('Test restrictions on login', () => {
    it('cannot reach /api/users without being logged in', () => {
        return request(server).get('/api/users/')
        .expect(400);
    })
    it('can log in', () => {
        return request(server).post('/api/login')
            .send({username: "victoria", password: "topham"})
            .expect(200)
            .then(res => {
                expect(res.body.token).toBeDefined();
            })
            
    })
})


