const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 9999;
const projectRouter = require('./routes/projects');
const uuid = require('uuid')
const User = require('./models/users.model');
const bcrypt = require("bcrypt");
var router = express.Router();
const cookiename = 'sid'

require('dotenv').config();
const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

var db = mongoose.connection;
 
db.on('error',(error)=> console.error(error))
db.once('open',() => {
    console.log("Base de datos conectada")
});

app.use(cors({origin:'http://localhost:3000',//frontend server localhost:8080
    methods:['GET','POST','PUT','DELETE'],
    credentials: true}))

app.use(express.json());

app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
    next();
    });

 //create one user
app.post('/signup', (req,res) =>{
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
                await user.save().then(()=>res.json({message: 'User added!'})).catch(err => res.status(400).json('Error;'+err));
            }else{
                return res.status(400).json({ message: 'el correo %s esta en uso' });
            }
            });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

//update user info
app.post('/update', (req,res) =>{
    console.log("update")
    try{
        var query = User.findOne({'email': req.body.email});
        query.select('email');
        query.exec(async function (err, user) {
            if (user){
                const salt = await bcrypt.genSalt(1);
                const hash = await bcrypt.hash(req.body.pass, salt);
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    pass: hash,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    })
                await user.findOneAndUpdate().then(()=>res.json('User added!')).catch(err => res.status(400).json('Error;'+err));
            }else{ 

                return res.status(400).json({ message: 'el correo %s esta en uso' });
            }
            });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

app.use(cookieParser('Shorty, you a full stack of waffle cakes.'));

app.use(session({   
    resave: false,
    saveUninitialized: true,
    secret: 'Shorty, you a full stack of waffle cakes.',
    cookie:{
        httpOnly: false,
        secure: false,
        maxAge:1000*60*60,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    /*genid: (req) => {
        uuid.v4();
    }*/

}));

//logout
app.get('/logout', (req, res) => {
    console.log("logout")
    req.session.destroy(err =>  {
        console.log("destroy")
        if(err){
            console.log("404")
            return res.status(404)
        }else{
            console.log("200")
            res.clearCookie(cookiename)
            return res.status(200)
        }
    })
});

//login
app.post('/', async (req,res) =>{
    console.log("login")
    try{
        var query = User.findOne({'email': req.body.email});
        query.select('username email pass');
        query.exec(async function (err, user) {
            if (user == null){
                return res.status(400).json({ message: 'el correo introducido es incorrecto' });
            }else{
                await bcrypt.compare(req.body.pass,user.pass, function(err, result){
                    if(result){
                        req.session.userId = user._id
                        console.log(req.session)
                        var cookieData = req.session.cookie
                        res.status(200).json({cookie: cookieData})
                    }else{
                        res.status(201).json({message : "Incorrect Password"})
                    }
                });
           }
            });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
});

//get all users
app.get('/home', redirectLogin, async (req,res) =>{
    console.log("('get /home')")
    try{
     //console.log(req.sessionID)
     const users =  await User.find();
     res.json(users);
    }catch(err){
     res.status(500).json({ message: err.message })
    }
});

app.get('/home/projects/mainboard/:id' , (req,res) =>{
    console.log("hello")
    res.json({message:hi})
})

app.use('/projects', projectRouter)

async function redirectLogin(req,res,next){
    console.log(req.session.userId)
    if(!req.session.userId){
        console.log("session not found")
        return res.status(201).json({message:"session not found"});
    }else{  
        console.log("session found")
        next();
    }
}

async function redirectHome(req,res,next){
    if(req.session){
        res.status(200).json({message:"session found"});
    }else{
        next();
    }
}

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


//MONTAR BOTON DE LOGOUT, FIJAR USERID CON SESSION ID.
//CREAR FRONT DE TABLAS 
//CHAT (IMPROBABLE)
//ENTREGA