const mongoose = require('mongoose'); 

const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    jobTitle: {
        type: String
    },

    score: Number,

    strengths: [String],

    improvements: [String],

    feedback: String,

    questions: [String],

    answers: [String]

}, {
    timestamps: true
});

module.exports = mongoose.model(
    'Interview',
    interviewSchema
);