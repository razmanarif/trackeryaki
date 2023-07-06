const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SeedSchema = new Schema ({
    trackingNo : {type: Number , default : Number, unique : true},
    description: {type: String, required: true},
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    currentLocation:{type: String, required: true},
    weight: {type: Number, required: true},
    unit: {type: Number, required: true},
    status: {
        type: String,
        enum: ['created', 'inProgress', 'delivered'],
        default: 'created'
    },
    assignedTo : []
},{timestamps: true})

module.exports = mongoose.model("seedModel", SeedSchema)