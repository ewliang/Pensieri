const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//Get All category
router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

router.get('/:id', categoryController.getPostsByCategory);

module.exports = router;
