const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'Must be at least 1'],
        max: [280, 'Cannot exceed 280'],
    },
    createdAt: {
        type: Date, //Date
        default: Date.now, // Set default value to the current timestamp
        timestamps: true, // Use a getter method to format the timestamp on query
    },
    username: { //the user that created this thought
        type: String,
        required: true,
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'thought' }], //these are like replies

    toJSON: {
        virtuals: true,
    }
})


// thoughtText
// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
userSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })
    .set(function (data) { //CHECK IF NEED THIS???
        this.set({
            reactions: [...data]
        })
    });

//initiatlize our User model
const User = model('user', userSchema);
module.exports = User;