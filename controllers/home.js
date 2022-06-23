const https = require('https');
const categories = require('../models/categories');
//GET '/home'
/*const getHome = (req, res, next) => {
    /*const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"

    const options = {
        hostname: 'backend-academy-osf.herokuapp.com',
        port: 443,
        path: '/api/products/product_search?primary_category_id=mens-clothing-dress-shirts&secretKey='+secretKey,
        method: 'GET',
    };

    req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        let body = "";
        let json;
      
        
        res.on("data", (chunk) => {
          body += chunk;
        });
        
        res.on("end", () => {
          try {
            json = JSON.parse(body);
              // do something with JSON
              //var obj = JSON.parse("_id");
              //let id = JSON.stringify("_id")
              //let id = JSON.translation['image'];
              var id = "Modern Striped Dress Shirt"
              /*var user = json.find(u => u.name === id);
              var deneme = json.find(short_description);
              console.log(user)
              console.log(deneme)*/
              //const first = json.id.find( (value) => value.id =='womens-clothing-jackets');
              //console.log(json['image']);
              //console.table(first)
              /*var keys = Object.keys(json);
              for (var i = 0; i < keys.length; i++) {
                console.log(json[i].short_description, json[i].id);//JSON dan istediğin veriyi çekme yolu
              }
          } catch (error) {
              console.error(error.message);
          };
        });
      
      });
      
      req.on('error', error => {
        console.error(error);
      });
      
      req.end();*/
      /*res.json({message: "GET all tea"});
    
};
module.exports = getHome;*/

const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '/api/categories?secretKey=$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe',
  method: 'GET',
};

/*const deneme =(req,res) =>{
  res.send("DENEME");
};*/
let json;
let data="";
var category_list = [];
exports.postLogin = (req, res) => {

  https.get(options,resp =>{
    resp.on("data", (chunk) => {
      data += chunk;
      //console.log(chunk)
    });

    resp.on("end", () =>{
      json = JSON.parse(data);
      //console.log(typeof data)
      //var keys = Object.keys(json);
      console.log(json[0].page_description)
      //var deneme = json[0].page_description;
      //console.log(deneme)
      for (var i = 0; i < json.length; i++) {
        if(json[i].parent_category_id =='mens' || json[i].parent_category_id =='womens'){
          let category = new categories(json[i].image, json[i]._id, json[i].id, json[i].page_description, json[i].page_title, json[i].parent_category_id,json[i].c_showInMenu, json[i].__v);
        //console.log(category.image !='categories/category_404.png')
        if(category.image !='categories/category_404.png'){
          category_list.push(category)
        }
        }
        //let category = new categories(json[i].image, json[i]._id, json[i].id, json[i].page_description, json[i].page_title, json[i].parent_category_id,json[i].c_showInMenu, json[i].__v);
        //let category = new categories(json[i].image, json[i]._id, json[i].id, json[i].page_description, json[i].page_title, json[i].parent_category_id,json[i].c_showInMenu, json[i].__v);
        //console.log(category.image !='categories/category_404.png')
        //if(category.image !='categories/category_404.png'){
        //  category_list.push(category)
        //}
        //category_list.push(category)
        
        //console.log(json[i].short_description, json[i].id);//JSON dan istediğin veriyi çekme yolu
      }
      
      //res.send(category_list)
      //console.log(category_list)
      res.render('shop/home', {
        category_list: category_list,
        pageTitle: 'All Categories',
        path: '/home'
      });

      data ="";
      category_list = [];
      
    });
    
  });

  
  
  /*req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let body = "";
    
  
    
    res.on("data", (chunk) => {
      body += chunk;
    });
    
    res.on("end", () => {
      try {
        json = JSON.parse(body);
          // do something with JSON
          //var obj = JSON.parse("_id");
          //let id = JSON.stringify("_id")
          //let id = JSON.translation['image'];
          var id = "Modern Striped Dress Shirt"
          /*var user = json.find(u => u.name === id);
          var deneme = json.find(short_description);
          console.log(user)
          console.log(deneme)*/
          //const first = json.id.find( (value) => value.id =='womens-clothing-jackets');
          //console.log(json['image']);
          //console.table(first)
          
          /*var keys = Object.keys(json);   
          for (var i = 0; i < 1; i++) {
            deneme1234= json[i].short_description
            console.log(deneme1234);//JSON dan istediğin veriyi çekme yolu
            
          }
          //res.send(String(deneme1234))
          
      } catch (error) {
          console.error(error.message);
      };
    });
  
  });
  req.on('error', error => {
    console.error(error);
  });
  
  req.end();*/
  //console.log(deneme1234)
  
  //res.send("veri");
};

//module.exports = deneme;