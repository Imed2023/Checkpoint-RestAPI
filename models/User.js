import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
        unique : true,
        
        },
    age: Number,
    
    createdat: {
        type:Date,
        default:Date.now()
},

})

const users= mongoose.model('users',userSchema)
export default users
