let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
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

router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit', {dino: dinosaurs[req.params.idx], dinoId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res) => {
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

router.delete('/:idx', (req, res) => {
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

router.put('/:idx', (req, res) => {
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


module.exports = router