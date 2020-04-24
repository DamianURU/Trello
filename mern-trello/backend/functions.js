


//logout

 //get one user
 app.get('/:id', redirectLogin, getUser, (req,res) =>{
     console.log(res.userTest)
     if(res.userTest != null){
         res.json({redirect:"true",
                     user : res.userTest})        
     }else{
         res.json({redirect:"false"})
     }
 });
 
 //update one user
 app.patch('/:id', redirectLogin, getUser, async (req,res) =>{
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
 
 //delete one user
 app.delete('/:id', redirectLogin, getUser, async (req,res)=>{
     try{
         await res.userTest.remove()
         res.json({message: 'Deleted User'})
     }catch(err){
         return res.status(500).json({ message: err.message });
     }
 });

 router.route('/').get((req,res) =>{
    Lists.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/addsublist').post((req,res) =>{
    const subname = req.body.sublists.name;
    const subdesc = req.body.sublists.description;
    const subdead = Date.parse(req.body.sublists.date);
    //checkthisline
    const newSubList = new Lists({subname,subdesc,subdead});
    const updated = newSublist.update()
    console.log(updated)
    .then(()=> res.json('Sublist updated!'))
    .catch(err => res.status(400).json('Error;'+err));
});


