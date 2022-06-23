const https = require('https');
const categories = require('../models/categories');

const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '',
  method: 'GET',
};

/*const deneme =(req,res) =>{
  res.send("DENEME");
};*/
let json;
let data="";
var category_list = [];
exports.getSubcategory = (req,res) =>{
    const catId = req.params.categoryId;
    options.path = '/api/categories/parent/'+catId+'?secretKey=$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe'

    https.get(options,resp =>{
        resp.on("data", (chunk) => {
          data += chunk;
        });
    
        resp.on("end", () =>{
          json = JSON.parse(data);
          //var keys = Object.keys(json);
          //var deneme = json[keys[0]].page_description;
          //console.log(json)
          for (var i = 0; i < json.length; i++) {
            let category = new categories(json[i].image, json[i]._id, json[i].id, json[i].page_description, json[i].page_title, json[i].parent_category_id,json[i].c_showInMenu, json[i].__v);
            //console.log(category.id)
            if(category.image !='categories/category_404.png'){
              category_list.push(category)
            }
            //category_list.push(category)
            
            //console.log(json[keys[i]].short_description, json[keys[i]].id);//JSON dan istediğin veriyi çekme yolu
          }
          
          //res.send(category_list)
          console.log(category_list)
          res.render('shop/categories', {
            category_list: category_list,
            pageTitle: 'All Categories',
            path: '/categories/'+catId
          });
    
          data ="";
          category_list = [];
        });
    });
    //res.send(category_list)
}

/*exports.postLogin = (req, res) => {

  https.get(options,resp =>{
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () =>{
      json = JSON.parse(data);
      var keys = Object.keys(json);
      var deneme = json[keys[0]].page_description;
      for (var i = 0; i < keys.length; i++) {
        let category = new categories(json[keys[i]].image, json[keys[i]]._id, json[keys[i]].id, json[keys[i]].page_description, json[keys[i]].page_title, json[keys[i]].parent_category_id,json[keys[i]].c_showInMenu, json[keys[i]].__v);
        //console.log(category.image !='categories/category_404.png')
        if(category.image !='categories/category_404.png'){
          category_list.push(category)
        }
        //category_list.push(category)
        
        //console.log(json[keys[i]].short_description, json[keys[i]].id);//JSON dan istediğin veriyi çekme yolu
      }
      
      //res.send(category_list)
      //console.log(category_list)
      res.render('shop/subcategories', {
        category_list: category_list,
        pageTitle: 'All Categories',
        path: '/home'
      });

      data ="";
      category_list = [];
      
    });
    
  });
};*/