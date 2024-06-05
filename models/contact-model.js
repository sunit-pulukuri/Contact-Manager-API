const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    creator_id:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
        
    }
    ,
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an eMail"],
    },
    phone: {
        type: String,
        required: [true, "Please add a phone"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("ContactModel", contactSchema);
