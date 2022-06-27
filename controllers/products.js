const https = require('https');
const products = require('../models/products');

const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '',
  method: 'GET',
};
let json;
let data="";
var product_list = [];

exports.getProduct = (req,res) =>{
    const prodId = req.params.productId;
    options.path = '/api/products/product_search?id='+prodId+'&secretKey=$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe'

    https.get(options,resp =>{
        resp.on("data", (chunk) => {
          data += chunk;
        });
    
        resp.on("end", () =>{
          json = JSON.parse(data);
          console.log(json)
          for (var i = 0; i < json.length; i++) {
            let product = new products(json[i].currency, json[i].id, json[i].image_groups, json[i].long_description, json[i].master, json[i].name, json[i].orderable, 
                json[i].page_description, json[i].page_title, json[i].price, json[i].price_max, json[i].primary_category_id, json[i].short_description, 
                json[i].type, json[i].variants, json[i].variation_attributes, json[i]._id)
            product_list.push(product);
          }

          res.render('shop/products', {
            product_list: product_list,
            breadcrumbs: req.breadcrumbs,
            pageTitle: 'Product Detail',
            path: '/products/'+prodId
          });
    
          data ="";
          product_list = [];
        });
    });
}