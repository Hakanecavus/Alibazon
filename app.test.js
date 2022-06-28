const request = require('supertest');
const app = require('./app');
const categories = require('./controllers/categories');

//const categories = require('./models/categories');

describe('categories', () =>
{
    it('GET /categories', () =>
    {
        return request(app).get('/categories/mens').set('Accept', 'application/json').expect(200);
    })

});
