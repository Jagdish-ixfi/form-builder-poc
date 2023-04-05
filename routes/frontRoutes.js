const express = require('express');
const router = express.Router();
const userForm = require('../controller/userFormController')

router.post('/user', userForm.createUserForm )
router.post('/user-form', userForm.getUserForm)
router.get('/user/:id', userForm.getForm)


module.exports = router;