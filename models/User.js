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
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            unique: true,
            required: true,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }], //users can have many thoughts
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }], //users can have many friends
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



//Schema Settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });
    // .set(function (data) { 
    //     this.set({
    //         friends: [...data]
    //     })
    // });

//initiatlize our User model
const User = model('user', userSchema);
module.exports = User;