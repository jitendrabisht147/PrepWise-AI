const Interview = require('./models/Interview');
require('dotenv').config();
const express = require('express');
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middleware/authMiddleware');
const OpenAI = require('openai');
const sendEmail = require('../Backend/Utils/sendEmail');
const PendingUser = require('../Backend/models/PendingUser')

const cors = require('cors');
const mongoose = require('mongoose');    
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    res.send('server running')
})


app.post('/register', async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        const pendingUser = new PendingUser({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires
        });

        await pendingUser.save();

        await sendEmail(
            email,
            "PrepWise AI - Email Verification",
            `
                <h2>Welcome to PrepWise AI </h2>
        
                <p>Your verification code is:</p>
        
                <h1 style="color:blue;">${otp}</h1>
        
                <p>This OTP is valid for 5 minutes.</p>
        
                <p>If you didn't create this account, you can ignore this email.</p>
            `
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please verify your email."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }

});

app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
        return res.status(404).json({
            success: false,
            message: "No pending registration found."
        });
    }
    if (pendingUser.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }
    if (pendingUser.otpExpires < new Date()) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired"
        });
    }
    const user = new User({
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password
    });
    
    await user.save();

    await PendingUser.deleteOne({
    email: pendingUser.email
});

   return res.status(200).json({
    success: true,
    message: "Account verified successfully"
});
});

app.post('/resend-otp', async (req, res) => {
    try {

        const { email } = req.body;

const pendingUser = await PendingUser.findOne({ email });

if (!pendingUser) {
    return res.status(404).json({
        success: false,
        message: "No pending registration found."
    });
}

const otp = Math.floor(100000 + Math.random() * 900000).toString();

const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

pendingUser.otp = otp;
pendingUser.otpExpires = otpExpires;

await pendingUser.save();

await sendEmail(
    email,
    "PrepWise AI - New Verification OTP",
    `
        <h2>Your New OTP</h2>
        <p>Your new verification code is:</p>
        <h1 style="color:blue;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
    `
);

return res.status(200).json({
    success: true,
    message: "New OTP sent successfully."
});


    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;    
        const existemail = await User.findOne({ email })


        if (!existemail) {
            return res.status(404).json({
                success: false,
                message: 'User Does not exist'
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            existemail.password
        )

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            })
        }
        const token = jwt.sign(
            { userId: existemail._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );


        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
})

app.get('/profile', authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId)
            .select('-password');

        const interviews = await Interview.find({
            userId: req.user.userId
        });

        const totalInterviews = interviews.length;

        const highestScore =
            totalInterviews > 0
                ? Math.max(...interviews.map(item => item.score))
                : 0;

        const averageScore =
            totalInterviews > 0
                ? Math.round(
                    interviews.reduce((sum, item) => sum + item.score, 0) /
                    totalInterviews
                )
                : 0;

        const questionsPracticed = interviews.reduce(
            (sum, item) => sum + item.questions.length,
            0
        );

        res.status(200).json({
            success: true,
            user,
            stats: {
                totalInterviews,
                averageScore,
                highestScore,
                questionsPracticed
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }
});

app.post('/generate-questions', authMiddleware, async (req, res) => {
    console.log(req.body);

    const {
        jobTitle,
        experience,
        skill,
        difficulty,
        numberOfQuestions
    } = req.body;

    try {

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `
Generate ${numberOfQuestions} interview questions.

Job Title: ${jobTitle}
Experience: ${experience}
Skill: ${skill}
Difficulty: ${difficulty}

Return only the questions.
`
                }
            ]
        });

        res.json({
            questions: response.choices[0].message.content
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Error generating questions'
        });
    }
});

app.post('/evaluate-interview', authMiddleware, async (req, res) => {
    try {

        console.log("Decoded User:", req.user);
        console.log("User ID:", req.user.userId);

        const { questions, answers, jobTitle } = req.body;
        console.log("Job Title from Frontend:", jobTitle);
        console.log(req.body);

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `
Evaluate this mock interview.

Questions:
${JSON.stringify(questions)}

Answers:
${JSON.stringify(answers)}

Return ONLY valid JSON.

Format:

{
  "score": 0,
  "strengths": [],
  "improvements": [],
  "feedback": ""
}

        `
                }
            ]
        });

        console.log("Questions:", questions);
        console.log("Answers:", answers);

        const aiResponse = response.choices[0].message.content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const evaluation = JSON.parse(aiResponse);


        const interview = new Interview({
            userId: req.user.userId,
            jobTitle,
            score: evaluation.score,
            strengths: evaluation.strengths,
            improvements: evaluation.improvements,
            feedback: evaluation.feedback,
            questions,
            answers
        });

        await interview.save();

        res.json({
            feedback: aiResponse
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Error evaluating interview'
        });
    }
});

app.get('/interviews', authMiddleware, async (req, res) => {
    try {

        const interviews = await Interview.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(interviews);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});

app.get('/interviews/:id', authMiddleware, async (req, res) => {
    try {

        const interview = await Interview.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!interview) {
            return res.status(404).json({
                message: 'Interview not found'
            });
        }

        res.json(interview);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});

app.get('/test-email', async (req, res) => {
    try {
        await sendEmail(
            "nikhilbisht147@gmail.com",
            "PrepWise AI Test Email",
            `
                <h2>Hello Nikhil 👋</h2>
                <p>This is your first email from PrepWise AI.</p>
                <h3>Congratulations! 🎉</h3>
            `
        );

        res.json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to send email"
        });
    }
});

app.listen(5000, () => {
    console.log('server running at http://localhost:5000')
});