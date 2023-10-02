const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const store = new session.MemoryStore();    // Only for development
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

const apiRouter = require('./routes/index');
const db = require('./controllers/user.controllers');
const { hashPassword, comparePasswords } = require('./utils/passwordHash');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'view', 'build')));

// Session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 *60 * 24,
        httpOnly: true,
        secure: false,  // For development
    },
    resave: false,
    saveUninitialized: false,
    store
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById(id);
        done(null, user);
    } catch (err) {
        console.log(err);
        return done(err);
    };
});

passport.use(new LocalStrategy(async function (email, password, done) {
    try {
        const user = await db.checkUserByEmail(email);
        if (!user) return done(null, false);
        const passwordMatched = await comparePasswords(password, user.password);
        if (!passwordMatched) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err);
    };
}));

// API router
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.json({message: "You arrived on Home page!"});
})

app.get('/logout', (req, res) => {
    req.logout(() => {});
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.json({message: "You did not login!"});  // Only for development
});

app.post('/login', 
        passport.authenticate('local', {
            failureRedirect: '/login'
        }),
        (req, res) => {
            res.status(200).json({message: "Successful Login!"});
        }
);

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (firstName && lastName && email && password) {
        try {
            const hashedPassword = await hashPassword(password);
            if (hashedPassword) {
                await db.createUser(firstName, lastName, email, hashedPassword, res);
            } else {
                console.error('Error while hashing password:', err.message);
                return res.status(500).json({ message: err.message });
            }
        } catch (err) {
            console.error('Error while adding user:', err.message);
            return res.status(500).json({ message: err.message });
        };
    } else {
        res.status(400).json({
            message: "Include all required fields in the request body!",
            requiredFields: ["firstName", "lastName", "email", "password"]
        });
    };
});

const absolutePath = path.resolve(__dirname, 'view', 'build', 'index.html');

app.get('*', (req, res) => {
    res.sendFile(absolutePath);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
