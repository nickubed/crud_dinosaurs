let express = require('express')
let layouts = require('express-ejs-layouts')
let fs = require('fs')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser!
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter

    if(nameFilter){
        // Filtering over my dinoData array, only returning values that have matched what I
        // input in my "nameFilter"
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index', {myDinos: dinoData})
})

app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new')
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

app.listen(3000, () => {console.log('🦊Singin and Dancin on Port 3000🦊')})