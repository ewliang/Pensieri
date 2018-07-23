'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
