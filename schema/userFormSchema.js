const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userFormSchema = new Schema({
    userId:{
        type: String,
        req: true
    },
    formId:{
        type: Schema.Types.ObjectId,
        ref: 'forms',
        req: true
    },
    filledFormData : { 
        type : Object,
        req: true
    },
    submitted:{
        type: Boolean,
        default: false
    },
    reopned : {
        type: Boolean,
        default: false
    },
    filledFormHistory : [{
        type : Object,
        req: true,
    }]
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const userforms = mongoose.model('userforms', userFormSchema);
module.exports = {userforms}