const express = require('express');
const router  = express.Router();
const subCategoryController = require('../controllers/subcategory');

router.get('/categories/:categoryId', subCategoryController.getSubcategory);


module.exports = router;