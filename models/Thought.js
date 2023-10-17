const { Schema, model } = require('mongoose');


//reactionSchema defines the shape of the subdocument/child document
//Not a model - will be used as the reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(), //Create a new ObjectId at the time we create this reaction
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
            type: Date,
            default: Date.now, 
            timestamps: true, 
        },
    }
);

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
    }
);

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })
    .set(function (data) { 
        this.set({
            reactions: [...data]
        })
    });

//initiatlize our Thought model
const Thought = model('thought', thoughtSchema);
module.exports = Thought;