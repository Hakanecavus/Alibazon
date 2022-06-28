const request = require('supertest');
const app = require('./app');
const categories = require('./routes/categories');

describe('categories', () =>
{
    it('GET /categories', () =>
    {
        return request(categories).get('/mens').expect('Content-Type', /json/).expect(200);
    })

});