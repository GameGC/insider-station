const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const ObjectId = Schema.ObjectId;

const NewsTikerSchema= new Schema({
    id: ObjectId,
    tikerId: ObjectId,
    title: String,
    body: String,
    date: Date,
    rating: Array
});

mongoose.model('NewsTikerSchema', NewsTikerSchema);
