const express = require("express");
const router = express.Router();
const{handleGetAllUsers,handlegetUserById,handleUpdateUserById,handleDeleteUserById, handleCreateNewUser} = require('../controllers/user')

// line 6 and 18 route are similar so we can minimize this  //router.get('/', handleGetAllUsers)   // router.post("/",  handleCreateNewUser);    
router.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser);


router
.route('/:id')
.get(handlegetUserById)


.patch(handleUpdateUserById)

.delete(handleDeleteUserById);


module.exports = router;
