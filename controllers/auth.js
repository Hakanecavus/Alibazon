const https = require('https');
const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
const options = {
  hostname: 'backend-academy-osf.herokuapp.com',
  port: 443,
  path: '/api/auth/signin',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

  let json='';
  let data ='';
  exports.postLogin = (req, res, next) => {
  var postData = JSON.stringify({
    "secretKey": secretKey,
    "email":req.body.email,
    "password": req.body.password
  })
 
  var req = https.request(options, (resp) => {
  
    resp.on('data', (d) => {
      process.stdout.write(d);
      data +=d;
    });
    resp.on("end", () =>{
      json = JSON.parse(data);
    });
    req.end();
    if(resp.statusCode == 200){
      res.redirect('/home');
    }
    
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end();
  
    // res.setHeader('Set-Cookie', 'loggedIn=true'); // Set-Cookie is a reserved name. the browser sends this data to the server with every req. other settings include Expires, Max-Age, Domain, Secure, HttpOnly  
  json = '';
  data ='';
  };

  exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
      path: '/register',
      pageTitle: 'register',
      isAuthenticated: false
    });
  };
exports.postRegister =(req, res, next) => {
  var postData = JSON.stringify({
    "secretKey": secretKey,
    "name": req.body.name,
    "email":req.body.email,
    "password": req.body.password
  });
  options.path ='/api/auth/signup';
  var req = https.request(options, (resp) => {
  
    resp.on('data', (d) => {
      process.stdout.write(d);
      data +=d;
    });
    resp.on("end", () =>{
      json = JSON.parse(data);
    });
    req.end();
    if(resp.statusCode == 200){
      res.redirect('/home');
    }
    
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end();
  
    // res.setHeader('Set-Cookie', 'loggedIn=true'); // Set-Cookie is a reserved name. the browser sends this data to the server with every req. other settings include Expires, Max-Age, Domain, Secure, HttpOnly  
  json = '';
  data ='';

};
