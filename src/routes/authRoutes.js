const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userID: user._id},'MY_SECRET_KEY');
        res.send({token});
    } catch(err) {
        return res.status(422).send(err);
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password!'});
    }
    if(!user) {
        return res.status(422).send({ error: 'Invalid password or email'});
    }
    try{
        console.log('yooo---');
        await user.comparePassword(password);
        const token = jwt.sign({ userID: user._id },'MY_SECRET_KEY');
        res.send({token});
    } catch(err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});
 
module.exports = router;