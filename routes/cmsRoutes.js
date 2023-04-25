const express = require('express');
const router = express.Router();
const form = require('../controller/formController')


router.post('/create', form.createForm);
router.get('/list', form.getForms);
router.put('/update/:id', form.updateForm);
router.get('/form/:id', form.formById);
router.put('/resubmit', form.reSubmit);
router.post('/histoy', form.history)
router.get('/form-history/:id', form.formHistoryById)


module.exports = router;