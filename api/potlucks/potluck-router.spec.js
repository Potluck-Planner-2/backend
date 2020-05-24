//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const PotluckRouter = require('./potluck-router.js');
const generateToken = require('../test-token');


server.use('/api/potlucks', PotluckRouter);
//generate login token
const token = generateToken({id: 5, username: "victoria"})


describe('Test all functions of the Potluck router', () => {
    beforeEach( async() => {
        await db.seed.run();
    });
//GET
    describe('test GET /api/potlucks', () => {
        it ('returns a list of users', () => {
            return request(server).get('/api/potlucks/')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.potlucks).toBeDefined();
                    expect(res.body.potlucks[0].id).toBe(1);
                    expect(res.body.potlucks[0].potluck_name).toBe("Andre's Going Away Party");
                    })
        });
    })

    describe('test GET /api/potlucks/:id', () => {
        it('rejects invalid potluck ids', () => {
            return request(server).get('/api/potlucks/500')
                .set({authorization: token})
                .expect(404)
        })
        it('returns a potluck with a good id', () => {
            return request(server).get('/api/potlucks/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.potluck).toBeDefined();
                    expect(res.body.potluck.id).toBe(1);
                    expect(res.body.potluck.potluck_name).toBe("Andre's Going Away Party");
                })
        })
    })

    describe('test GET /api/potlucks/mine/organizer', () => {
        
        it('returns a list of potlucks', () => {
            return request(server).get('/api/potlucks/mine/organizer')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.potlucks).toBeDefined();
                    expect(res.body.potlucks[0].id).toBe(5);
                    expect(res.body.potlucks[0].potluck_name).toBe('Cookoff To Cure smallpox');
                })
        })

    })

    describe('test GET /api/potlucks/mine/guest', () => {
        
        it('returns a list of potlucks', () => {
            return request(server).get('/api/potlucks/mine/guest')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.potlucks).toBeDefined();
                    expect(res.body.potlucks[1].id).toBe(6);
                    expect(res.body.potlucks[1].potluck_name).toBe('Roller Coaster Protest Extravaganza');
                })
        })

    })

    describe('test GET /api/potlucks/:id/guests', () => {
        it('doesnt work with an invalid potluck id', () => {
            return request(server).get('/api/potlucks/500/guests')
                .set({authorization: token})
                .expect(404)
        })
        it('returns a list of guests', () => {
            return request(server).get('/api/potlucks/1/guests')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.guests).toBeDefined();
                    expect(res.body.guests[0].username).toBe("lisa");
                })
        })

    })

    describe('test POST /api/potlucks', () => {
        it('doesnt work without all necessary data', () => {
            return request(server).post('/api/potlucks')
                .set({authorization: token})
                .send({name: "potluck"})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please include the potluck name, location, and datetime in the body of your request.")
                })
        })
        it('can post a new potluck', () => {
            return request(server).post('/api/potlucks')
                .set({authorization: token})
                .send({name: "potluck", location: "somewhere", datetime: "tomorrow"})
                .expect(201)
                .then(res => {
                    expect(res.body.message).toBe("Potluck successfully created");
                    expect(res.body.potluck.potluck_name).toBe("potluck");
                })
        })
    })
    describe('test PUT /api/potlucks/:id', () => {
        it('doesnt work with an invalid id', () => {
            return request(server).put('/api/potlucks/500')
                .set({authorization: token})
                .send({name: "potluck", location: "somewhere", datetime: "tomorrow"})
                .expect(404)
        })
        it('works with a valid id', () => {
            return request(server).put('/api/potlucks/1')
                .set({authorization: token})
                .send({name: "potluck", location: "somewhere", datetime: "tomorrow"})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Potluck successfully updated");
                    expect(res.body.potluck.potluck_name).toBeDefined;
                })
        })
        it('doesnt work with an invalid organizer id', () => {
            return request(server).put('/api/potlucks/1')
                .set({authorization: token})
                .send({name: "potluck", location: "somewhere", datetime: "tomorrow", organizer_id: 0})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please update using a valid user id as the organizer id")
                })
        })
        

    })

    describe('tests DELETE /potlucks/:id', () => {
        it('doesnt work with an invalid id', () => {
            return request(server).delete('/api/potlucks/500')
                .set({authorization: token})
                .expect(404)
        })

        it('works with a valid id', () => {
            return request(server).delete('/api/potlucks/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Potluck successfully deleted")
                })
        })
    })

    describe('GET /api/potlucks/:id/items works', () => {
        it('doesnt work with an invalid id', () => {
            return request(server).get('/api/potlucks/500/items')
                .set({authorization: token})
                .expect(404)
        })
        it('works with a valid id', () => {
            return request(server).get('/api/potlucks/5/items')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.items).toBeDefined();
                    expect(res.body.items[0].item_id).toBe(5)
                    
                })
        })
    })
})