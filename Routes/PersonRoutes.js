const express = require('express')
const router = express.Router()
const person = require('../models/Person')
//add person @Post
router.post('/newperson', (req, res) => {
    let newperson = new person(req.body)
    newperson.save((err, data) => {
        err ? console.log(err) : res.send('person was added')

    })
})
//model.find() for Search in Database
//get person @get
router.get('/', (req, res) => {
    person.find({}, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})
//model.findOne() to Return a Single Matching Document from  Database
router.get('/:favoriteFoods', (req, res) => {
    person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})
// model.findById() to Search in Database By _id
//get person by id @get
router.get('/:id', (req, res) => {
    person.find({ _id: req.params.id }, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})
//delete person by id @delete
router.delete('/:id', (req, res) => {
    person.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
        err ? console.log(err) : res.json({ msg: "person was deleted" })

    })
})

// Create many People with Model.create() 
var arrayOfPeople = [
    { name: "anas", age: 74, favoriteFoods: ["pizza"] },
    { name: "emy", age: 76, favoriteFoods: ["roast chicken"] },
    { name: "rayhan", age: 78, favoriteFoods: ["hamburger"] }
];

router.post('/many', (req, res) => {

    person.create(arrayOfPeople, (err, data) => {
        err ? console.log(err) : res.json(data)

    }
    )
})
//Updates by Running Find, Edit, then Save
//update person by id @put 
router.get('/hamburger/:id', (req, res) => {
    person.findById( {_id:req.params.id}, (err, data) => {
        data.favoriteFoods.push("hamburger");
        data.save(err ? console.log(err) : res.json({ data })
        );})
      })
//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put('/name/:name', (req, res) => {
    person.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true }, (err, data) => {
        err ? console.log(err) : res.json({ data })
    })
})
//Delete One Document Using model.findByIdAndRemove
router.delete('/person/:id', (req, res) => {
    person.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})
//Delete Many Documents with model.remove()
router.delete('/', (req, res) => {
    person.remove({ name: "Mary" }, (err, data) => {
        err ? console.log(err) : res.json({ msg: "ALL name:Mary deleted" })
    })
})
//Chain Search Query Helpers to Narrow Search Results
router.get('/burritos', (req, res) => {
    person.find({ favoriteFoods: "burritos" }).
        sort({name: 1 }).
        limit(2).
        select({ age: false }).
        exec((err, data) => {
            err ? console.log(err) : res.json(data)
        })
})






module.exports = router