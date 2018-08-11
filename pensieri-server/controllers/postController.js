const Post = require('../models/Post');

module.exports = {
  //Get All Posts
  getPosts: function(req, res) {
    Post.find({}, (err, data) => {
      if(err) {
        console.error(err);
        res.status(404).json({
          message: err
        });
      } else {
        if(data == null) {
          res.status(400).json({
            message: "No posts were found."
          });
        } else {
          res.json(data);
        }
      }
    });
  },

  //Get Posts by Category
  getPostsByCategory: function(req, res) {
    Post.find({ category: req.body.categoryID }, (err, data) => {
      if(err) {
        console.error(err);
        res.status(404).json({
          message: err
        });
      } else {
        if(data == null) {
          res.status(400).json({
            message: "No posts were found."
          });
        } else {
          res.json(data);
        }
      }
    });
  },

  //Create New Post
  createPost: function(req, res) {
    var newPostData = new Post({
      title: req.body.title,
      body: req.body.body,
      isPublished: req.body.isPublished,
      isFeatured: req.body.isFeatured
    });
    newPostData.save((err, data) => {
      if(err) {
        console.log("Error occurred while attempting to create a new post.");
        res.status(404).json({
          message: err
        });
      } else {
        res.status(200).json(data);
      }
    });
  },

  //Update Post
  updatePost: function(req, res) {
    Post.findByIdAndUpdate(req.params.id, { $set:
      {
        title: req.body.title,
        body: req.body.body,
        isPublished: req.body.isPublished,
        isFeatured: req.body.isFeatured
      }
    }, { new: true }, (err, data) => { //New:true is so data returns the modified document. By default it's false.
      if(err) {
        console.log("Error occurred while attempting to update post with id [" + req.params.id + "]");
        res.status(404).json({
          message: err
        });
      } else {
        res.status(200).json(data);
      }
    });
  },

  //Delete Post
  deletePost: function(req, res) {
    Post.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if(err) {
        console.error(err);
        res.status(404).json({
          message: err
        });
      } else {
        if(data == null) {
          res.status(204).json({
            message: "Failed to delete the requested post. The post was not found."
          });
        } else {
          console.log("The post [${req.params.id}] was successfully deleted.");
          res.status(200).json(data);
        }
      }
    });
  }
}
