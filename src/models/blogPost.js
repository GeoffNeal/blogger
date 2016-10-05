'use strict';

var mongoose = require("mongoose");
var BlogPostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true,
		trim: true
	},
	postDate: {
		type: Date,
		default: Date.now
	}
});

var BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;