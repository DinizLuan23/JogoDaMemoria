const mongoose = require('mongoose');

const pontoSchema = new mongoose.Schema({
    points: Number
},{
    timestamps:true
})

module.exports = mongoose.model('Pontos', pontoSchema);