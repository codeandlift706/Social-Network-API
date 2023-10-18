const { Schema, Types } = require('mongoose');

//reactionSchema defines the shape of the subdocument/child document
//Not a model - will be used as the reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), 
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

module.exports = reactionSchema;
