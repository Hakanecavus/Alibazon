const https = require('https');
const categories = require('../models/categories');

const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '/api/categories?secretKey='+secretKey,
  method: 'GET',
};

let json;
let data="";
var category_list = [];
exports.getParentCategories = (req, res) => {

  https.get(options,resp =>{
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () =>{
      json = JSON.parse(data);
      for (var i = 0; i < json.length; i++) {
        if(json[i].parent_category_id =='mens' || json[i].parent_category_id =='womens'){
          let category = new categories(json[i].image, json[i]._id, json[i].id, json[i].page_description, json[i].page_title, json[i].parent_category_id);
        
          if(category.image !='categories/category_404.png'){
            category_list.push(category)
          }
        }
        
      }
      res.render('shop/home', {
        category_list: category_list,
        pageTitle: 'All Categories',
        path: '/home'
      });

      data ="";
      category_list = [];
      
    });
    
  });
};