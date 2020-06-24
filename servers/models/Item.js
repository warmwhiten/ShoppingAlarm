const mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    title : String,
    url : String,
    isSoldout: String,
    board_date: {type:Date, default: Date.now()}
})

module.exports = mongoose.model('Item', ItemSchema);