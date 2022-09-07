const express = require('express');
const router = express.Router();

require('../db/conn');

const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', (req, res) => {

    const {name, email, phone, password, cpassword} = req.body;

    if(!name || !email || !phone || !password || !cpassword)
    {
        return res.status(422).json({error : "Please Enter all the field"});
    }

    User.findOne({email : email})
        .then((userExist) => {
            if(userExist)
            {
            return res.status(422).json({error : "Email Already Exists"});
            }

            const user = new User({name, email, phone, password, cpassword});


            user.save().then(() => {
                return res.status(202).json({error : "User Registered Successfully"});
            })
            .catch((err) => {
                return res.status(500).json({error : "Database error, Failed to Register"});
            });
        })
        .catch((err) => {console.log(err)});
});

module.exports = router;