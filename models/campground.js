var mongoose = require('mongoose')

var campgroundSchema = new mongoose.Schema({
	name: String, 
	image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

module.exports = Campground