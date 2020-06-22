let express = require('express')
let fs = require('fs')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser!
app.use(express.urlencoded({extended: false}))
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dinosaurs/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

app.post('/dinosaurs', (req, res) => {
    // read dinosaurs file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    // add the new content to the dinosaurs array
    dinosaurs.push(req.body)
    // save the new array content to dinosaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    // redirect to the /dinosaurs
    res.redirect('/dinosaurs')
})

app.delete('/dinosaurs/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    // Remove the selected dinosaur from our "dinosaurs" array
    dinosaurs.splice(req.params.idx, 1)
    // Save over our dinosaurs.json with the newly formatted dinosaurs array.
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    // Once everything is done, we want to show the user the impact of their actions
    // by redirecting to the /dinosaurs route to see all remaining dinosaurs.
    res.redirect('/dinosaurs')
})

app.put('/dinosaurs/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    // Select name & type of dinosaur selected by it's ID, then reassign name & type
    dinosaurs[req.params.idx].name = req.body.name
    dinosaurs[req.params.idx].type = req.body.type
    // rewrite the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    // redirect to main page
    res.redirect('/dinosaurs')
})

app.listen(3000, () => {console.log('🦊Singin and Dancin on Port 3000🦊')})