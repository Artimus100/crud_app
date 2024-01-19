var Userdb = require('../model/model');

//create and save user
exports.create = (req, res)=>{
  //validate teh request
  if(!req.body){ //for empty body
    res.status(400).send({message : "Content can not be empty!"})
    return;
  }

  //New user
  const user= new Userdb({
    name : req.body.name,
    email : req.body.email,
    gender: req.body.gender,
    status : req.body.status
  })

  //save user
  user 
    .save(user)//to save data in the mongo db database
    .then(data =>{
    //res.send(data)
    res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message: err.mesage || "some error occured while creating a create operation"
        });
    });
}

//retrieve and return users/ retrieve and return single user
exports.find = (req,res)=>{
 Userdb.find()
 .then(user =>{
    res.send(user)
 })
 .catch(err =>{
    res.status(500).send({message: err.message || "some error occured while retrieving the data"})
 })
}

//Update a new identifirs user by user id

exports.update = (req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: `Cannot update user id with ${id}.Maybe user not found`} )
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {UseFindAndModify: false})
    .then(data =>{
       if(!data){
        res.status(404).send({message: `Cannot Update user with ${id}, Maybe user not found`})
       }else{
        res.send(data)
       }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Update user information"})
     })


}
   

//delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot delete with id ${id}. Maybe the id is wrong`})

        }else{
            res.send({
                message:"User was deleted succesfuckingly"
            });
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error deletingan user"})
    })

    
}