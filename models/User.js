const { Schema, model } = require('mongoose');

//User Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, // Must match a valid email address (look into Mongoose's matching validation)???
            unique: true,
            required: true,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }], //user can have many thoughts ???????? or thoughts._id
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }], //user can have many friends, self-referencing ?????????? or user._id
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



//Schema Settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })
    .set(function (data) { //CHECK IF NEED THIS???
        this.set({
            friends: [...data]
        })
    });

//initiatlize our User model
const User = model('User', userSchema);
module.exports = User;