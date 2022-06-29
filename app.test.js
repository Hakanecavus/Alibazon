const request = require('supertest');
const app = require('./app');
const categories = require('./controllers/categories');

//const categories = require('./models/categories');

describe('categories', () =>
{
    it('GET /categories/mens', () =>
    {
        return request(app).get('/categories/mens').set('Accept', 'application/json').expect(200);
    })

    it('GET /categories/womens', () =>
    {
        return request(app).get('/categories/womens').set('Accept', 'application/json').expect(200);
    })

});

describe('subcategories', () =>
{
    it('GET /subcategory/mens-clothing', () =>
    {
        return request(app).get('/subcategory/mens-clothing').set('Accept', 'application/json').expect(200);
    })

    it('GET /subcategory/womens-clothing', () =>
    {
        return request(app).get('/subcategory/womens-clothing').set('Accept', 'application/json').expect(200);
    })

});

describe('subcategoryDetail for mens', () =>
{
    it('GET /subcategoryDetail/mens-clothing-suits', () =>
    {
        return request(app).get('/subcategoryDetail/mens-clothing-suits').set('Accept', 'application/json').expect(200);
    })

});

describe('subcategoryDetail for womens', () =>
{
    it('GET /subcategoryDetail/womens-clothing-tops', () =>
    {
        return request(app).get('/subcategoryDetail/womens-clothing-tops').set('Accept', 'application/json').expect(200);
    })

});

describe('products', () =>
{
    it('GET /products/25589208', () =>
    {
        return request(app).get('/products/25589208').set('Accept', 'application/json').expect(200);
    })

});

describe('home', () =>
{
    it('GET home', () =>
    {
        return request(app).get('/home').set('Accept', 'application/json').expect(200);
    })

});
