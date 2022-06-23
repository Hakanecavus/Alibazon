const express = require('express');
const router  = express.Router();
const subCategoryController = require('../controllers/subcategoryDetail');

router.get('/:categoryId', subCategoryController.getProducts);


module.exports = router;