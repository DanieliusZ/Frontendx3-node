const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PanelSchema=new Schema({
    author:{type:String, required:true},
    url:{type:String, required:true},
    description:{type:String, required:true}
})

module.exports = mongoose.model('Panel', PanelSchema);