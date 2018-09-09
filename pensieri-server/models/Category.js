'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    permalink: {
      type: String,
      unique: true,
      required: true
    },
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', CategorySchema);
