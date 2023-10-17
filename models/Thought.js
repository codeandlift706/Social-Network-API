const { Schema, model } = require('mongoose');


//thoughtSchema defines the shape of the parent document
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Must be at least 1'],
            max: [280, 'Cannot exceed 280'],
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            timestamps: true, 
        },
        username: { //the user that created this thought
            type: String,
            required: true,
        },
        reactions: [reactionSchema], //these are like replies
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });
    // .set(function (data) { 
    //     this.set({
    //         reactions: [...data]
    //     })
    // });

//initiatlize our Thought model
const Thought = model('thought', thoughtSchema);
module.exports = Thought;