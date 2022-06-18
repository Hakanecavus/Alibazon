const express = require("express");
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const path = require('path');

const app = express();

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

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.set("views", path.join(__dirname, "views"));

app.get("/", function rootHandler(req, res) {
    res.render("home")
});



app.listen(3000);
