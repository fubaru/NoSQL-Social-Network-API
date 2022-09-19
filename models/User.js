const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Inputing a username is mandatory',
            trim: true,
        },
        email: {
            type: String,
            required: 'Please enter a valid email',
            unique: true,
            validate: {
                validator(validEmail) {
                    return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                        validEmail
                    );
                },
                message: 'Please enter a valid email',
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//friendCount virtual 
userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;