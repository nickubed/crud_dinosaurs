// Declare and require our friendly dependencies / modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

// Declare our app
let app = express()

// Set our friendly view engine, EJS
app.set('view engine', 'ejs')
// Set express static to look at our /public folder, giving us access to our sunny CSS
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser! Body-parser allows us to access the information we pass from
// the front-end!
app.use(express.urlencoded({extended: false}))
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride('_method'))

// Declare our controllers, how are we going to find data pertaining to my dinosaurs!
app.use('/dinosaurs', require('./controllers/dinosaurs'))

// Base landing page route
app.get('/', (req, res) => {
    res.render('home')
})

// Make sure we're listening on port 3000 for client signals!
app.listen(3000, () => {console.log('🦊Singin and Dancin on Port 3000🦊')})