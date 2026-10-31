const express = require('express');
const path = require('path');

const { connectToMongoDB } = require('./connect');
const cookieParser = require('cookie-parser')
const URL = require('./models/url');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth');



const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', checkAuth,staticRoute );
app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);

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
