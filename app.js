const express = require("express");
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const path = require('path');
const https = require('https');

const app = express();
const homeRoute = require('./routes/home'); // import the routes
const subCategoryRoute = require('./routes/subcategory'); // import the routes

//const authRoutes = require('../routes/auth');


app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");




Sentry.init({
    dsn: "https://3b526fa3744648fcbc96338519f1ba85@o1288527.ingest.sentry.io/6505482",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
app.use( express.static( "public" ) );


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
//app.use(authRoutes);


app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});
app.use(express.json());
app.use(homeRoute);
app.use(subCategoryRoute);

/*app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});*/

/*get_breadcrumbs = function (url) {
    var rtn = [{ name: "Home", url: "/" }],
      acc = "", // accumulative url
      arr = url.substring(1).split("/");
  
    for (i = 0; i < arr.length; i++) {
      acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
      rtn[i + 1] = {
        name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
        url: acc,
      };
    }
    return rtn;
  };
  app.use(function (req, res, next) {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);
    next();
  });*/



/*app.get("/", function rootHandler(req, res) {
    res.render("shop/home")
});*/
/*const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"

const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '/api/products/product_search?primary_category_id=mens-clothing-dress-shirts&secretKey='+secretKey,
  method: 'GET',
};*/

/*const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  let body = "";

  
  res.on("data", (chunk) => {
    body += chunk;
  });
  
  res.on("end", () => {
    try {
        let json = JSON.parse(body);
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
        //console.table(first)/*
        /*var keys = Object.keys(json);
        for (var i = 0; i < keys.length; i++) {
          console.log(json[keys[i]].short_description, json[keys[i]].id);//JSON dan istediğin veriyi çekme yolu
        }
    } catch (error) {
        console.error(error.message);
    };
  });

});*/

/*req.on('error', error => {
  console.error(error);
});

req.end();*/


/*app.get("/", function rootHandler(req, res) {
  res.render("shop/home")
});*/


app.listen(3000);
