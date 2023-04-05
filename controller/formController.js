const mongoose = require('mongoose');
const forms = require('../schema/formSchema').forms
const userforms = require('../schema/userFormSchema').userforms

const createForm = async (req, res) => {
    try {
        const {title, formData} = req.body;
        if (!title || !formData) {
            res.status(400).send('Insufficient Paramaters')
        }
        const insertedItem = await forms.create({...req.body});
        res.json({
            status : 200,
            data : insertedItem,
            message : 'Form Created Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

}

const getForms = async (req,res) =>{
    try {
        const items = await forms.find({});
        res.json({
            status : 200,
            data : items,
            message : 'Form Created Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

const updateForm = async (req,res) =>{
    try {
        if (!req.params.id) {
            res.status(400).send('Insufficient Paramaters')
        }
        const updatedItem = await forms.findOneAndUpdate({_id : new mongoose.Types.ObjectId(req.params.id)}, {...req.body});
        res.json({
            status : 200,
            data : updatedItem,
            message : 'Form Updated Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

const formById = async (req, res) =>{
    try {
        if (!req.params.id) {
            res.status(400).send('Insufficient Paramaters')
        }
        const item = await forms.findById({_id : new mongoose.Types.ObjectId(req.params.id)});
        res.json({
            status : 200,
            data : item,
            message : 'Form fetched Successfully'
        })
    } catch (error) {
        console.log(error)
    }  
}

const reSubmit = async (req, res) =>{
    try {
        const {formId, userId} = req.body;
        if (!formId || !userId) {
            res.status(400).send('Insufficient Paramaters')
        }

        const item = await userforms.findOne({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId)
        });

        item.filledFormHistory.push(item.filledFormData);
        item.reopned = true;
        item.submitted = false;
        item.save();

        res.json({
            status : 200,
            message : 'From asked for resubmitted'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    createForm,
    getForms,
    updateForm,
    formById,
    reSubmit
}