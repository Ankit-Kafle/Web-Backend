const express = require('express');
const path = require('path');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', staticRoute);
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    try {
        const entry = await URL.findOneAndUpdate(
            { shortID: req.params.shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({ error: 'short URL not found' });
        }

        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Redirect failed:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

connectToMongoDB('mongodb://127.0.0.1:27017/short_url')
    .then(() => {
        console.log('Mongodb connected');
        app.listen(PORT, () => {
            console.log(`Server Started at PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    });
