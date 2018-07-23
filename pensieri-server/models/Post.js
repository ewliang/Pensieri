'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);
