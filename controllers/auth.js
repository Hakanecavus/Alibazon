exports.getSignin = (req, res, next) => {
    res.render('auth/signin', {
      path: '/signin',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

exports.postSignin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true'); // Set-Cookie is a reserved name. the browser sends this data to the server with every req. other settings include Expires, Max-Age, Domain, Secure, HttpOnly  
    res.redirect('/');
  };
