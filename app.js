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
get_breadcrumbs = function (url) {
  var rtn = [{ name: "Home", url: "/home" }],
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
});
app.use(express.json());
app.use('/home',homeRoute);
app.use('/categories',categoryRoute);
app.use('/subcategory',subCategoryRoute);
app.use('/subcategoryDetail',subCategoryDetailRoute);
app.use('/products',productsRoute);


app.listen(3000);
