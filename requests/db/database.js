const mongoose = require('mongoose');

class database{
    constructor() {
    }

    async Connect(){
        return await mongoose.connect('mongodb+srv://admin:QsKvPXDxPdMP86u@cluster0.gbvi5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }
}
module .exports = database
