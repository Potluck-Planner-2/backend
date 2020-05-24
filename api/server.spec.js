//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../dbConfig');
const server = require('./server.js');
const UserRouter = require('./users/users-router.js');
const PotluckRouter = require('./potlucks/potluck-router.js');
const LoginRouter = require('./login/login-router.js');
const ItemsRouter = require('./items/items-router.js');
const InvitesRouter = require('./invites/invites-router.js');

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