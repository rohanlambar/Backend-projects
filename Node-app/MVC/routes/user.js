const express = require('express')

const router = express.Router();
const {handleGetAllUsers,handleCreateUser,handleGetUserById,handleUpdateById,handleDeleteUserById} = require('../controller/user');

router.route('/')
      .get(handleGetAllUsers)   
      .post(handleCreateUser)


router.route('/:id')
      .get(handleGetUserById)  
       .patch(handleUpdateById)
       .delete(handleDeleteUserById)


module.exports = router;