/*const express = require('express');
const User = require('../models/users.model');
const bcrypt = require("bcrypt");
var router = express.Router();
const uuid = require('uuid/v4');


//get all
router.get('/', async (req,res) =>{
   try{
    console.log(req.sessionID)
    const users =  await User.find();
    res.json(users);
   }catch(err){
    res.status(500).json({ message: err.message })
   }
});

//get one
router.get('/:id', getUser, (req,res) =>{
    console.log(res.userTest)
    if(res.userTest != null){
        res.json({redirect:"true",
                    user : res.userTest})        
    }else{
        res.json({redirect:"false"})
    }
});

//create one
router.post('/', (req,res) =>{
console.log("sign up")
    try{
        var query = User.findOne({'email': req.body.email});
        query.select('email');
        query.exec(async function (err, user) {
            if (user == null){
                const salt = await bcrypt.genSalt(1);
                const hash = await bcrypt.hash(req.body.pass, salt);
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    pass: hash,
                    name: req.body.name,
                    lastname: req.body.lastname,
                   })
                await user.save().then(()=>res.json('User added!')).catch(err => res.status(400).json('Error;'+err));
            }else{ 

                return res.status(400).json({ message: 'el correo %s esta en uso' });
            }
          });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

//login
/*router.post('/log', async (req,res) =>{
    console.log("login")
    try{
        var query = User.findOne({'email': req.body.email});
        query.select('_id email pass');
        query.exec(async function (err, user) {
            if (user == null){
                return res.status(400).json({ message: 'el correo introducido es incorrecto' });
            }else{
                await bcrypt.compare(req.body.pass,user.pass, function(err, result){
                    if(result){
                        req.session.email = req.body.email
                        res.json({redirect: "true"})
                    }else{
                        res.status(400).json({message : "Incorrect Password"})
                    }
                });
           }
            });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

//update one
router.patch('/:id', getUser, async (req,res) =>{
    if(req.body.username != null){
        res.userTest.username = req.body.username
    }
    if(req.body.email != null){
        res.userTest.email = req.body.email
    }
    if(req.body.pass != null){
        res.userTest.pass = req.body.pass
    }
    if(req.body.name != null){
        res.userTest.name = req.body.name
    }
    if(req.body.lastname != null){
        res.userTest.lastname = req.body.lastname
    }
    try{
        await res.userTest.save()
        return res.json({ redirect: 'true' });
    }catch(err){
        return res.status(400).json({ message: err.message });
    }
});

//delete one
router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.userTest.remove()
        res.json({message: 'Deleted User'})
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next){
    let userTest
    try{
        userTest = await User.findById(req.params.id);
        if(userTest == null ){
            return res.status(404).json({message:"cannot find user"})
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    res.userTest = userTest;
    next()
}

module.exports = router;*/