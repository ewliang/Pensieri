'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    permalink: String,
    body: String,
    isFeatured: {
      type: Boolean,
      default: false
    },
    isPublished:  {
      type: Boolean,
      default: false
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);
