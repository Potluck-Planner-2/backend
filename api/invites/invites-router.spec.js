//require just like... a bunch of stuff
const request = require('supertest');
const db = require('../../dbConfig');
const server = require('../server.js');
const generateToken = require('../test-token');


//generate login token
const token = generateToken({id: 5, username: "victoria"})


describe('Test all functions of the Invites router', () => {
    beforeEach( async() => {
        await db.seed.run();
    });
//GET
    describe('test GET /api/invites', () => {
        it ('returns a list of items', () => {
            return request(server).get('/api/invites')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.invites).toBeDefined();
                    expect(res.body.invites[0].id).toBe(1);
                    expect(res.body.invites[0].user_id).toBe(6);
                    })
        });
        it ('doesnt work without a token', () => {
            return request(server).get('/api/invites')
                .expect(400)
        });
    })

    describe('test GET /api/invites/:id', () => {
        it ('does not work for an invalid id', () => {
            return request(server).get('/api/invites/100')
                .set({authorization: token})
                .expect(404)
        });
        it ('returns the invite for a valid id', () => {
            return request(server).get('/api/invites/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.invite).toBeDefined();
                    expect(res.body.invite.id).toBe(1);
                    expect(res.body.invite.user_id).toBe(6);
                    })
        });
    })

    describe('test GET /api/invites/potlucks/:id', () => {
        it('returns an array of invites', () => {
            return request(server).get('/api/invites/potlucks/1')
            .set({authorization: token})
            .expect(200)
            .then(res => {
                expect(res.body.invites).toBeDefined();
                expect(res.body.invites[0].id).toBe(1);
            })
        })

        it('does not work with a bad potluck number', () => {
            return request(server).get('/api/invites/potlucks/100')
            .set({authorization: token})
            .expect(404)

        })
    })

    describe('test GET /api/invites/potlucks/:id/mine, the insane endpoint i was forced to make at gunpoint', () => {
        it('returns an array of no invite if its a potluck you werent invited to', () => {
            return request(server).get('/api/invites/potlucks/4/mine')
            .set({authorization: token})
            .expect(200)
            .then(res => {
                expect(res.body.invites).toBeDefined()
                expect(res.body.invites[0]).toBeUndefined()
            })
        })

        it('returns an array of a single if its a potluck you werent invited to', () => {
            return request(server).get('/api/invites/potlucks/6/mine')
            .set({authorization: token})
            .expect(200)
            .then(res => {
                expect(res.body.invites[0].user_id).toBe(5)
            })
        })

        it('does not work with an invalid potluck id', () => {
            return request(server).get('/api/invites/potlucks/600/mine')
            .set({authorization: token})
            .expect(404)
        })
    })

    describe('test POST /api/invites', () => {
        it ('doesnt work without valid data', () => {
            return request(server).post('/api/invites')
                .set({authorization: token})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please include a user_id and a potluck_id in the body of your request.")
                })
        });
        it ('works with valid content' , () => {
            return request(server).post('/api/invites')
                .set({authorization: token})
                .send({user_id: 1, potluck_id: 1})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Invite successfully created")
                    expect(res.body.invite.user_id).toBe(1);
                })
        });
        it ('doesnt work with an invalid user_id' , () => {
            return request(server).post('/api/invites')
                .set({authorization: token})
                .send({user_id: 100, potluck_id: 1})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please use a valid user_id")
                })
        });
        it ('doesnt work with an invalid potluck_id' , () => {
            return request(server).post('/api/invites')
                .set({authorization: token})
                .send({user_id: 1, potluck_id: 100})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please use a valid potluck_id")
                })
        });
    })

    describe('test PUT /api/invites/:id', () => {
        it ('doesnt work without id', () => {
            return request(server).put('/api/invites/100')
                .set({authorization: token})
                .expect(404)
                
        });
        
        it ('works with valid content' , () => {
            return request(server).put('/api/invites/1')
                .set({authorization: token})
                .send({user_id: 5, potluck_id: 5})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Invite successfully updated")
                    expect(res.body.invite.user_id).toBe(5)
                })
        })
        it ('doesnt work with an invalid user_id' , () => {
            return request(server).put('/api/invites/1')
                .set({authorization: token})
                .send({user_id: 100, potluck_id: 1})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please use a valid user_id")
                })
        });
        it ('doesnt work with an invalid potluck_id' , () => {
            return request(server).put('/api/invites/1')
                .set({authorization: token})
                .send({user_id: 1, potluck_id: 100})
                .expect(400)
                .then(res => {
                    expect(res.body.message).toBe("Please use a valid potluck_id")
                })
        });
    })

    describe('test DELETE /api/invites/:id', () => {
        it('doesnt work if the id is invalid', () => {
            return request(server).delete('/api/invites/100')
                .set({authorization: token})
                .expect(404)
        });
        it('works if the id is valid', () => {
            return request(server).delete('/api/invites/1')
                .set({authorization: token})
                .expect(200)
                .then(res => {
                    expect(res.body.message).toBe("Invite successfully deleted");
                    expect(res.body.num_of_records).toBe(1)
                })
        });
    })

})