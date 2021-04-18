require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://mitin:123456$@cluster0.59zoe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.log('Error coonnecting to mongo: ' + err);
});

app.get('/', requireAuth, (req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.get('/test', (req,res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});