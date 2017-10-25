var express = require('express'),
		app = express(),
		bodyParser = require('body-parser')
		mongoose = require('mongoose')
		Campground = require('./models/campground.js')
app.use(bodyParser.urlencoded({extended: true}))

var PORT = 8080

app.set("view engine", "ejs");

app.use(express.static("public"))


//MONGODB AND MONGOOSE
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/yelpcamp')
var db = mongoose.connection
db.on('error', function(err){
	console.log(`mongoose errer: ${err}`)
})
db.once('open', function(){
	console.log(`mongoose connection successful`)
})

// Campground.create({
// 			name: "campground2",
// 			image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=1500&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
// 		}, function(err, camp){
// 			if(err){
// 				throw err
// 			}
// 			else{
// 				console.log(camp)
// 			}
// })


//we can just type file name bc ejs automatically looks inside the views folder
app.get('/', function(req,res){
	res.render("landing")
})

app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, data){
		if(err){
			throw err
		}
		else{
			// console.log(data)
			res.render('campgrounds', {"campgrounds": data})
		}
	})
})


app.post('/campgrounds', function(req, res){
	//get data from form and add it to the array
	//redirect to the campgrounds page

	console.log(req.body)

	//add camp to the database
	var saveCamp = new Campground(req.body)
	saveCamp.save(function(err, data){
		if(err){
			console.log(err)
		}
		else{
			console.log(`data saved!`)
			console.log(data)

			res.redirect('/campgrounds')
		}
	})
})

app.get('/campgrounds/new', function(req,res){
	res.render('new.ejs')
})

app.listen(PORT, function(){
	console.log(`YelpCamp started -- connected to port ${PORT}`)
})