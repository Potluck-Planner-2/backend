//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const LoginRouter = require('./login-router');


server.use('/api/login', LoginRouter);

describe('Test restrictions on login', () => {

    beforeEach( async() => {
        await db.seed.run();
    });
    
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
    it("can't attempt login with bad username", () => {
        return request(server).post('/api/login')
            .send({username: "tictoria", password: "vopham"})
            .expect(404)
            .then(res => {
                expect(res.body.token).toBeUndefined();
            })
            
    })
    it("can't attempt login with bad password", () => {
        return request(server).post('/api/login')
            .send({username: "victoria", password: "vopham"})
            .expect(401)
            .then(res => {
                expect(res.body.token).toBeUndefined();
            })
            
    })
})


