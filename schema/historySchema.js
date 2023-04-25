const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema({
    title: {
        type: String,
        req: true
    },
    formId: {
        type: Schema.Types.ObjectId,
        ref: 'forms',
    },
    formData: [{
        type: Object,
        req: true,
    }],
},
    {
        timestamps: { updatedAt: 'updated_at' }
    })

const formHistory = mongoose.model('form-history', formSchema);
module.exports = { formHistory }