const mongoose = require('mongoose');
const userforms = require('../schema/userFormSchema').userforms
const forms = require('../schema/formSchema').forms

const createUserForm = async (req, res) => {
    try {
        const {userId, formId, filledFormData, submitted} = req.body;
        if (!userId || !formId || !filledFormData) {
            res.status(400).send('Insufficient Paramaters')
        }
        
        const userFormDone = await userforms.exists({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId),
            submitted: true
        });

        if (userFormDone) {
            res.status(200).send('Form Already submitted')            
        }


        const userFormSubmitted = await userforms.exists({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId),
            submitted: false
        })

        if (userFormSubmitted) {
            const data = {
                filledFormData : filledFormData
            }
            if (req.body.hasOwnProperty('submitted')) {
                data.submitted = submitted
            }

            const updatedItem = await userforms.findOneAndUpdate({
                userId : userId,
                formId : new mongoose.Types.ObjectId(formId)}, data);
            res.json({
                status : 200,
                data : updatedItem,
                message : 'Form Updated Successfully'
            })
        }

        // TODO: Check form not present or not published before create.
        // TODO: Check User not present

        const userFormExists = await userforms.exists({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId),
        }); 

        if (!userFormExists) {
            const insertedItem = await userforms.create({...req.body});
            res.json({
                status : 200,
                data : insertedItem,
                message : 'Form Created Successfully'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

}

// Get Draft Ones
const getUserForm = async (req, res) =>{
    try {
        const {userId, formId} = req.body;
        if (!userId || !formId) {
            res.status(400).send('Insufficient Paramaters')
        }

        const isUserFormPresent = await userforms.exists({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId),
        })
        if (!isUserFormPresent) {
            res.status(200).send('No Form Present')
        }

        const isUserFormSubmitted = await userforms.exists({
            userId : userId,
            formId : new mongoose.Types.ObjectId(formId),
            submitted: false
        })

        if (isUserFormSubmitted) {
            const draftForm = await userforms.findById(isUserFormSubmitted._id);
            res.json({
                status : 200,
                data : draftForm,
                message : 'Form Created Successfully'
            })
        } else {
            res.status(200).send('Form Already submitted')
        }

    } catch (error) {
        
    }
}

const getForm = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).send('Insufficient Paramaters')
        }
        // TODO: check form not present
        const item = await forms.findById({
            _id : new mongoose.Types.ObjectId(req.params.id),
            published : true
        });
        if (item) {
            res.json({
                status : 200,
                data : item,
                message : 'Form fetched Successfully'
            })
        } else {
            res.json({
                status : 200,
                message : 'Form Not Published'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUserForm,
    getUserForm,
    getForm
}