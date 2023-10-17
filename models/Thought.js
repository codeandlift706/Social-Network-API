const { Schema, model } = require('mongoose');


//reactionSchema defines the shape of the subdocument/child document
//Not a model - will be used as the reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema({
    reactionId: {
        id: Schema.Types.ObjectId, // Use Mongoose's ObjectId data type
        default: new Schema.Types.ObjectId, //Default value is set to a new ObjectId????? Why
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Cannot exceed 280'],
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, //Date
        default: Date.now, // Set default value to the current timestamp
        timestamps: true, // Use a getter method to format the timestamp on query
    },
});

//thoughtSchema defines the shape of the parent document
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
    reactions: [reactionSchema], //these are like replies

    toJSON: {
        virtuals: true,
    }
});

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })
    .set(function (data) { //CHECK IF NEED THIS???
        this.set({
            reactions: [...data]
        })
    });

//initiatlize our User model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;