const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema({
    title:{
        type: String,
        req: true
    },
    formData : {
        type : Object,
        req: true
    },
    published:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const forms = mongoose.model('forms', formSchema);
module.exports = {forms}