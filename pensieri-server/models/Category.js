'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true
    },
    permalink: {
      type: String
    },
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', CategorySchema);
