const Category = require('../models/Category');
const Post = require('../models/Post');

module.exports = {
  //Get All Categories
  getCategories: function(req, res) {
    Category.find({}, (err, data) => {
      if(err) {
        console.error(err);
        res.status(404).json({
          message: err
        });
      } else {
        if(data == null) {
          res.status(400).json({
            message: "No categories were found."
          });
        } else {
          res.json(data);
        }
      }
    });
  },

  //Create New Category
  createCategory: function(req, res) {
    var newCategoryData = new Category({
      title: req.body.title,
      description: req.body.description,
      isPublished: req.body.isPublished
    });
    newCategoryData.save((err, data) => {
      if(err) {
        console.log("Error occurred while attempting to create a new category.");
        res.status(404).json({
          message: err
        });
      } else {
        res.status(200).json(data);
      }
    });
  },

  //Update Category
  updateCategory: function(req, res) {
    Category.findByIdAndUpdate(req.params.id, { $set:
      {
        title: req.body.title,
        description: req.body.description
      }
    }, { new: true }, (err, data) => { //New:true is so data returns the modified document. By default it's false.
      if(err) {
        console.log("Error occurred while attempting to update category with id [" + req.params.id + "]");
        res.status(404).json({
          message: err
        });
      } else {
        res.status(200).json(data);
      }
    });
  },

  //Delete Category
  deleteCategory: function(req, res) {
    Category.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if(err) {
        console.error(err);
        res.status(404).json({
          message: err
        });
      } else {
        if(data == null) {
          res.status(204).json({
            message: "Failed to delete the requested category. The category was not found."
          });
        } else {
          console.log("The category [${req.params.id}] was successfully deleted.");
          res.status(200).json(data);
        }
      }
    });
  },

  //Get Posts By Category
  getPostsByCategory: function(req, res) {
    
  }
}
