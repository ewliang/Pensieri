const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  //Get All Users
  getUsers: function(req, res) {
    res.status(200).json({
      message: "Welcome to the backend!"
    });
  },

  //Get A User
  getUser: function(req, res) {

  },

  //Create User
  createUser: function(req, res) {

  },

  //Update User
  updateUser: function(req, res) {

  },

  //Delete User
  deleteUser: function(req, res) {

  },

  //Get Posts By User
  getPostsByUser: function(req, res) {
    
  }
}
