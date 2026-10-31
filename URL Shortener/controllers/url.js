const { nanoid } = require("nanoid")
const URL = require('../models/url')

async function handlegenerateNewShortURL(req,res) {
const body = req.body;
if(!body.url) return res.status(400).json({error:'url is required'})
const shortID = nanoid(8);
await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory : [],
    createdBy: req.user._id,
})

const urls = await URL.find({ createdBy: req.user._id });

return res.render('home',{
    id: shortID,
    urls,
});
    // return res.json({id: shortID});
}


async function  handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID})
    if (!result) {
        return res.status(404).json({ error: 'short URL not found' });
    }
    return res.json({totalClicks: result.visitHistory.length,
         analytics: result.visitHistory,
        });
}


module.exports ={
    handlegenerateNewShortURL,
    handleGetAnalytics
}
