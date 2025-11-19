const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const productSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : false,
    },
    price : {
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        required : true,
    },
    category:{
        type : ObjectId,
        required : true,
    },
    rating : {
        type : Number,
        default: 0,
    },
    isActive:{
        type: Boolean,
        default: true,
        
    },
    images: {
        type: [String],
        required: false,
},
},
{timestamps: true}  
);
module.exports = mongoose.model('Product', productSchema);
