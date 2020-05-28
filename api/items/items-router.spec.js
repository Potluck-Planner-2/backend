//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const ItemsRouter = require('./items-router.js');
const generateToken = require('../test-token');


server.use('/api/items', ItemsRouter);
//generate login token
const token = generateToken({id: 5, username: "victoria"})


describe('Test all functions of the Items router', () => {
    beforeEach( async() => {
        await db.seed.run();
    });
//GET
    describe('test GET /api/items', () => {
        it ('returns a list of items', () => {
            return request(server).get('/api/items')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.items).toBeDefined();
                    expect(res.body.items[0].item_id).toBe(1);
                    expect(res.body.items[0].name).toBe('Peanut Brittle');
                    })
        });
        it('doesnt work without a token', () => {
            return request(server).get('/api/items')
            .expect(400)
        })
    })

    describe('test GET /api/items/:id', () => {
        it ('returns the item', () => {
            return request(server).get('/api/items/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.item).toBeDefined();
                    expect(res.body.item.item_id).toBe(1);
                    expect(res.body.item.name).toBe('Peanut Brittle');
                    })
        });
        it ('404s on an invalid id', () => {
            return request(server).get('/api/items/100')
                .set({authorization: token})
                .expect(404)
        });
    })

    describe('test GET /api/items/users/:id', () => {
        it ('returns the items for the user', () => {
            return request(server).get('/api/items/users/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.items).toBeDefined();
                    expect(res.body.items[0].item_id).toBe(1);
                    expect(res.body.items[0].name).toBe('Peanut Brittle');
                    })
        });
        it ('404s on an invalid user id', () => {
            return request(server).get('/api/items/users/100')
                .set({authorization: token})
                .expect(404)
        });
    })

    describe('test POST /api/items', () => {
        it ('does not work if you do not have the info', () => {
            return request(server).post('/api/items')
                .set({authorization: token})
                .send({name: "itemName"})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please include a potluck_id and name in your submission");
                    
                });
        })

        it ('works if you have the right info', () => {
            return request(server).post('/api/items')
                .set({authorization: token})
                .send({name: "itemName", potluck_id: 3})
                .expect(201)
                .then(res => {
                    expect(res.body.message).toBe("Item successfully created");
                    expect(res.body.item.name).toBe("itemName")
                    
                });
        })
        it ('does not work with an invalid potluck id', () => {
            return request(server).post('/api/items')
                .set({authorization: token})
                .send({name: "itemName", potluck_id: 300})
                .expect(404)
                .then(res => {
                    expect(res.body.message).toBe("Please include a valid potluck_id");
                   
                    
                });
        })
    })

    describe('test PUT /api/items/:id', () => {
        it('does not work with an invalid item id', () => {
            return request(server).put('/api/items/500')
                .set({authorization: token})
                .send({name: "itemName", potluck_id: 3})
                .expect(404)
        })
        it('does not work with an invalid potluck id', () => {
            return request(server).put('/api/items/1')
                .set({authorization: token})
                .send({name: "itemName", potluck_id: 300})
                .expect(404)
        })
        it('works with valid data', () => {
            return request(server).put('/api/items/1')
                .set({authorization: token})
                .send({name: "itemName", potluck_id: 3})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Item successfully updated");
                    expect(res.body.item.name).toBe("itemName");
                })
        })
    })
    describe('test DELETE /api/items/:id', ()=> {
        it('does not work with an invalid item id', () => {
            return request(server).delete('/api/items/500')
                .set({authorization: token})
                .expect(404)
        })
        it('works with a valid id', () => {
            return request(server).delete('/api/items/5')
            .set({authorization: token})
            .expect(200)
            .then(res => {
                expect(res.body.message).toBe("Item successfully deleted");
                expect(res.body.num_of_records).toBe(1);
            })
        })
    })
})