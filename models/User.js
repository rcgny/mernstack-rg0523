// We need to model our user data by setting up the mongoose schema.
// For example what fields will be associated with the user taht will be stored in the db.
import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false            
    },
   role:  {
    type: String,
    required: true,
    default: 'user',
    enum: ['user','admin', 'root']
   }
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);  // Model is User, and Collection will be Users