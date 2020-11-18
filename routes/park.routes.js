const express = require('express')
const parkModel = require('../models/park.model')
const router = express.Router()


router.get('/', (req, res) => {
    parkModel
        .find()
        .then(allParks => res.render('parks/parks-index', { allParks }))
        .catch(err => console.log('There was an error', err))
})




router.get('/new', (req, res) => res.render('parks/new-park'))

router.post('/new', (req, res) => {
    const { name, description } = req.body
    
    parkModel
        .create({ name, description })
        .then(park => res.redirect('/parks'))
        .catch(err => console.log('There was an error creating Park:', err))
})




router.get('/delete', (req, res) => {
    const parkId = req.query.id

    parkModel
        .findByIdAndDelete(parkId)
        .then(() => res.redirect('/parks'))
        .catch(err => console.log('There was an error deleting:', err))
})




router.get('/edit', (req, res) => {
    const parkId = req.query.id
    
    parkModel
        .findById(parkId)
        .then(park => res.render('parks/edit-park', { park }))
        .catch(err => console.log('There was an error:', err))
})

router.post('/edit', (req, res) => {
    const parkId = req.query.id
    const { name, description } = req.body
    
    parkModel
        .findByIdAndUpdate(parkId, { name, description })
        .then(park => res.redirect(`/parks/${parkId}`))
        .catch(err => console.log('There was an error:', err))
})




router.get('/:id', (req, res) => {
    const parkId = req.params.id

    parkModel
        .findById(parkId)
        .then(park => res.render('parks/park-details', { park }))
        .catch(err => console.log('There was an error', err))
})



module.exports = router

// res.render('parks/parks-index', allParks)