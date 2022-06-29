const https = require('https');
const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '/api/auth/signin',
  method: 'POST',
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

exports.postLogin = (req, res, next) => {
  var data = JSON.stringify({
    "secretKey": secretKey,
    "email":req.body.email,
    "password": req.body.password
  })
  var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(data);
  req.end();
    

  req.session.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true'); // Set-Cookie is a reserved name. the browser sends this data to the server with every req. other settings include Expires, Max-Age, Domain, Secure, HttpOnly  
  res.redirect('/');
  };
