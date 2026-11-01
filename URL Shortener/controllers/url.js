const { randomBytes } = require("node:crypto")
const URL = require('../models/url')

async function handlegenerateNewShortURL(req,res) {
const body = req.body;
if(!body.url) return res.status(400).json({error:'url is required'})
let parsedURL;
try {
    parsedURL = new globalThis.URL(body.url);
} catch {
    return res.status(400).json({ error: "Enter a valid http or https URL." });
}
if (!['http:', 'https:'].includes(parsedURL.protocol)) {
    return res.status(400).json({ error: "Only http and https URLs are supported." });
}
const shortID = randomBytes(6).toString('base64url');
await URL.create({
    shortID: shortID,
    redirectURL: parsedURL.toString(),
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
    const result = await URL.findOne({ shortID, createdBy: req.user._id })
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
