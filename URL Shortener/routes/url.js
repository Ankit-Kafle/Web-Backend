const express = require('express');
const {handlegenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post("/",handlegenerateNewShortURL);

router.get('/analytics/:shortID', require('../middlewares/auth').restrictToLoggedinUserOnly, handleGetAnalytics)

module.exports= router;
