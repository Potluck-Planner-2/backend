//require just like... a bunch of stuff
const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../../dbConfig');
const server = require('../server.js');
const UserRouter = require('./users-router.js');
const LoginRouter = require('../login/login-router');
const generateToken = require('../test-token')

server.use('/api/users', UserRouter);
server.use('/api/login', LoginRouter);

//generate login token
const token = generateToken({id: 5, username: "victoria"})


describe('Test all functions of the User router', () => {
    beforeEach( async() => {
        await db.seed.run();
    });
//GET
    describe('test GET /api/users', () => {
        it ('returns a list of users', () => {
            return request(server).get('/api/users/')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.users).toBeDefined();
                    expect(res.body.users[0].id).toBe(1);
                    expect(res.body.users[0].username).toBe("nobody");
                    })
        });
    })

    describe('test GET /api/users/:id', () => {
        it('returns a single user if a valid id is supplied', () => {
            return request(server).get('/api/users/5')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.username).toBe("victoria");
                })
        })
        it('does not return a user if an invalid id is supplied', () => {
            return request(server).get('/api/users/500')
                .set({authorization: token})
                .expect(404)
        })
    })

//POST
    describe('test POST /api/users', () => {
        it('will not post if information is missing', () => {
            return request(server).post('/api/users')
                .set({authorization: token})
                .send({username: "hellothere"})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please include a username, email, first_name, last_name, and password in the body of your request.");
                })
        })
        it('will not post if username is already taken', () => {
            return request(server).post('/api/users')
                .set({authorization: token})
                .send({username: "victoria", email: "hi", first_name: "victoria", last_name: "topham", password: "Hellothere"})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Username already taken.");
                })
        })
        it('Will create a user with correct info', () => {
            return request(server).post('/api/users')
                .set({authorization: token})
                .send({username: "hank", email: "nobutt", first_name: "hank", last_name: "hill", password: "buuuh"})
                .expect(201)
                .then(res => {
                    expect(res.body.message).toBe("Creation successful");
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.username).toBe("hank")
                })
        })
        
    })
//PUT
    describe('test PUT /api/users', () => {
        it('will not let you edit a user with an invalid id', () => {
            return request(server).put('/api/users/500')
                .set({authorization: token})
                .expect(404)
        })

        it('lets you edit existing users', () => {
            return request(server).put('/api/users/5')
                .set({authorization: token})
                .send({first_name: "squid"})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Update successful");
                    expect(res.body.user.first_name).toBe("squid");
                })
        })
    })
//DELETE
    describe('test DELETE /api/users/:id', () => {
        it('wont let you delete a non existent user', () => {
            return request(server).delete('/api/users/500')
                .set({authorization: token})
                .expect(404)
        });
        it('will let you delete an existing user', () => {
            return request(server).delete('/api/users/4')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Successfully deleted")
                    return request(server).get('/api/users/4')
                        .set({authorization: token})
                        .expect(404);
                })
        })
    })
})