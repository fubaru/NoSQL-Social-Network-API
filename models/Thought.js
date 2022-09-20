const { Schema, model, Types } = require('mongoose');
// create date format utils then import
const dateFormat = require('');

const thoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Input needs to be in the form of text',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: s
        },
        reactions: []
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please Enter Your Reaction',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'name input required',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: 1
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);