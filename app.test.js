const request = require('supertest');
const app = require('./app');
const categories = require('./routes/categories');

/*const categories = require('./models/categories');

describe('categories', () =>
{
    it('GET /categories', () =>
    {
        return request(categories).get('/mens').expect('Content-Type', /json/).expect(200);
    })

});*/

describe('GET /categories', function(){
    it('respond with json', function(done){
      request(categories)
        .get('/categories/mens')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    },30000)
  });