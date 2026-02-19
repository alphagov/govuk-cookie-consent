//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Version 1.0.0 routing

// Show message on the cookie banner after the user has submitted accept or reject
router.post('/pages/cookie-banner', function (req, res) {

    var cookiePreference = req.session.data['cookies']

    if (cookiePreference == 'no') {

        res.redirect('/pages/cookie-banner-reject')

    } else {

    res.render('/pages/cookie-banner-accept')
    } 

})

// "close the banner"
router.post('/pages/banner-accept', function (req, res) {

    var hideBanner = req.session.data['hide']

    if (hideBanner == 'yes') {

        res.redirect('/pages/welcome')

    } else {

    res.render('/pages/cookie-banner-accept')
    } 

})

// "close the banner"
router.post('/pages/banner-reject', function (req, res) {

    var hideBanner = req.session.data['hide']

    if (hideBanner == 'yes') {

        res.redirect('/pages/welcome')

    } else {

    res.render('/pages/cookie-banner-reject')
    } 

})

// Version 2.0.0 routing

// Show message on the cookie banner after the user has submitted accept or reject
router.post('/pages-v2/cookie-banner', function (req, res) {

    var cookiePreference = req.session.data['cookies']

    if (cookiePreference == 'no') {

        res.redirect('/pages-v2/cookie-banner-reject')

    } else {

    res.render('/pages-v2/cookie-banner-accept')
    } 

})

// "close the banner"
router.post('/pages-v2/banner-accept', function (req, res) {

    var hideBanner = req.session.data['hide']

    if (hideBanner == 'yes') {

        res.redirect('/pages-v2/welcome')

    } else {

    res.render('/pages-v2/cookie-banner-accept')
    } 

})

// "close the banner"
router.post('/pages-v2/banner-reject', function (req, res) {

    var hideBanner = req.session.data['hide']

    if (hideBanner == 'yes') {

        res.redirect('/pages-v2/welcome')

    } else {

    res.render('/pages-v2/cookie-banner-reject')
    } 

})
