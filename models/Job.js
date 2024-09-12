const { ref } = require('joi')
const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please Provide Company Name"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Please Provide Position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User'],
    },
},
{ timestamps: true}
)

module.exports = mongoose.model('Job', JobsSchema) 
