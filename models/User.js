const { kMaxLength } = require('buffer')
const { Schema, model, SchemaTypes} = require('mongoose')
require('mongoose-type-email')
const dateFormat = require('../utils/dateFormat')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: [1, 'Must be 1 character or more!'],
            maxlength: [280, 'Must be 280 characters or less!'],
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User