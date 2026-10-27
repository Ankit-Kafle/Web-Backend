const express = require('express')
const app = express();
const URL= require('./models/url')
const { connectToMongoDB } = require('./connect');
const PORT = 8001;
const urlRoute = require('./routes/url');

connectToMongoDB('mongodb://127.0.0.1:27017/short_url').
then(() => console.log("Mongodb connected"));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));

app.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID: shortId
    }, 
    {
         $push:{
        visitHistory: { timestamp: Date.now()},
    }}
    );
    if (!entry) {
        return res.status(404).json({ error: 'short URL not found' });
    }
    res.redirect(entry.redirectURL);
})