//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const UserRouter = require('./users-router.js');
const LoginRouter = require('../login/login-router');

server.use('/api/users', UserRouter);
server.use('/api/login', LoginRouter);
var token = "";

describe('Test all functions of the User router', () => {
    beforeEach( async() => {
        await db.seed.run();
    });

    //function to login

    

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



    describe('test GET /api/users', () => {
        
        
        it ('returns a list of users', () => {
            
        })
        
    })

    console.log(token)
})