const { Schema, model, Types } = require('mongoose')
const dateFormater = require('../utils/dateFormat')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: [1,'Reactions must be between 1 & 280 characters!'],
            maxlength: [280,'Reactions must be between 1 & 280 characters!']
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormater(createdAtVal)
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: [1, 'Thoughts must be between 1 * 280 Characters in length!'],
            maxlength: [280,'Thoughts must be between 1 * 280 Characters in length!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormater(createdAtVal)

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }, 
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought