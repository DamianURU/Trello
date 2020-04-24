const router = require('express').Router();
let Project = require('../models/projects.model');

router.route('/Test').post((req,res) =>{
    const name = req.body.name;
    const description = req.body.description;
    const creator = req.body.creator
    const users = req.body.users
    const lists = req.body.lists
    const newProject= new Project({name,description,creator,users,lists});
    const updated = newProject.save()
    .then(()=> res.json(updated))
    .catch(err => res.status(400).json('Error;'+err));
});

router.route('/createProject').post((req,res) =>{
    const name = req.body.name;
    const description = req.body.description;
    const creator = req.session.userId
    const newProject= new Project({name,description,creator});
    const updated = newProject.save()
    .then(()=> res.status(200))
    .catch(err => res.status(400).json('Error;'+err));
});

router.get('/userProjects', getProjects, (req,res)=>{
    //console.log(res.projectsTest)
    if(res.projectsTest != null){
        res.json(res.projectsTest)        
    }else{
        res.json({message: "fail"})
    }
});

router.get('/getProject', getSingleProject, (req,res)=>{
    if(res.projectsTest != null){
        res.json(res.projectsTest)
    }else{
        res.json({message: "fail"})
    }
})

router.get('/addList',getSingleProject,(req,res)=>{
    if(res.projectsTest != null){
        res.json(res.projectsTest)
    }else{
        res.json({message: "fail"})
    }
})

router.get('/editList')

router.post('/addSublist', async (req,res)=>{
    let query
    console.log(req)
    query = await Project.findById(req.body.id);
    query.where('lists').in([req.body.arraypos]);
    query.exec(async function (err, result) {
    console.log(result)});
    })

router.get('/addUsers')

router.get('/editProyect')

async function getProjects(req, res, next){
    let projectsTest
    try{
        projectsTest = await Project.find({'creator': req.session.userId});
        if(projectsTest == null ){
            return res.status(404).json({message:"cannot find user"})
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    res.projectsTest = projectsTest;
    next()
}

async function getSingleProject(req, res, next){
    let projectId = req.headers.referer.substring(req.headers.referer.lastIndexOf('/')+1)
    let projectsTest
    try{
        projectsTest = await Project.findById(projectId);
        if(projectsTest == null ){
            return res.status(404).json({message:"cannot find project"})
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    res.projectsTest = projectsTest;
    next()
}

module.exports = router;