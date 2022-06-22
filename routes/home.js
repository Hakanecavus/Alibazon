const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/home');

//router.get('/', authController.getData);
router.get('/', homeController.postLogin);
//router.route('/').get(postData);

//module.exports = router;

//const secretKey = "$2a$08$OLe5hqWHd9T.rBHGngjc2u/I9uTC93NwOE2VI2vQ0Bmznk3tsbrHe"
/*router.get("/",(req, res) => {
    res.send("Hi")
  });*/

/*router.get('/',(req, res => {
    res.send("Hi")
}))*/

console.log('router')
module.exports = router;


  