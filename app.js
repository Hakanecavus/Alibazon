const express = require("express");
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const path = require('path');
const https = require('https');

const app = express();
const homeRoute = require('./routes/home');
const categoryRoute = require('./routes/categories');
const subCategoryRoute = require('./routes/subcategory');
const subCategoryDetailRoute = require('./routes/subcategoryDetail');
const productsRoute = require('./routes/products');

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");




Sentry.init({
    dsn: "https://3b526fa3744648fcbc96338519f1ba85@o1288527.ingest.sentry.io/6505482",
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});
app.use( express.static( "public" ) );


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.use(express.json());
app.use('/home',homeRoute);
app.use('/categories',categoryRoute);
app.use('/subcategory',subCategoryRoute);
app.use('/subcategoryDetail',subCategoryDetailRoute);
app.use('/products',productsRoute);

app.get('/', function(req, res) {
  res.redirect('/home')
});
module.exports = app


app.listen(3000);
