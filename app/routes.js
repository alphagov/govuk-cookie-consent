//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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