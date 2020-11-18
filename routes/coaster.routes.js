const express = require('express')
const router = express.Router()

const coasterModel = require('../models/coaster.model')
const parkModel = require('../models/park.model')


router.get('/', (req, res) => {
    coasterModel
        .find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', { allCoasters }))
        .catch(err => console.log('There was an error', err))
})




router.get('/new', (req, res) => {
    parkModel
        .find()
        .then(allParks => res.render('coasters/new-coaster', { allParks }))
        .catch(err => console.log('There was an error with allParks:', err))
})

router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body
    
    coasterModel
        .create({ name, description, inversions, length, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log('There was an error creating Coaster:', err))
})




router.get('/delete', (req, res) => {
    const coasterId = req.query.id
    
    coasterModel
    .findByIdAndDelete(coasterId)
    .then(() => res.redirect('/coasters'))
    .catch(err => console.log('There was an error deleting:', err))
    
})




router.get('/edit', (req, res) => {
    const coasterId = req.query.id
    
    coasterModel
        .findById(coasterId)
        .then(coaster => {
            parkModel
            .find()
            .then(allParks => res.render('coasters/edit-coaster', { coaster, allParks }))
            .catch(err => console.log(err))
        })
        .catch(err => console.log('There was an error:', err))
})

router.post('/edit', (req, res) => {
    const coasterId = req.query.id
    const { name, description, inversions, length, park } = req.body
    
    coasterModel
        .findByIdAndUpdate(coasterId, { name, description, inversions, length, park })
        .then(() => res.redirect(`/coasters/${coasterId}`))
        .catch(err => console.log('There was an error:', err))
})




router.get('/:id', (req, res) => {
    const coasterId = req.params.id

    coasterModel
        .findById(coasterId)
        .populate('park')
        .then(coaster => res.render('coasters/coaster-details', { coaster }))
        .catch(err => console.log('There was an error with the coaster:', err))
})



module.exports = router

