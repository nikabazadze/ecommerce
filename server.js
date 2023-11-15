const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('./models'); 
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

const apiRouter = require('./routes/index');
const db = require('./controllers/user.controllers');
const { hashPassword, comparePasswords } = require('./utils/passwordHash');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://ziplix.netlify.app',
    credentials: true
};

app.options('*', cors());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'view', 'build')));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "project-ziplix.s3.amazonaws.com"],
        },
    },
}));

// Session config
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 *60 * 24 * 7,    // 7 days
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    },
    resave: false,
    saveUninitialized: false,
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
    res.status(200).json({ message: "User logged out successfully!"});
});

app.get('/currentUser', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            isAuthenticated: true,
            user: {
                id: req.user.id,
                firstName: req.user.first_name,
                lastName: req.user.last_name,
                email: req.user.email
            }
        });
    } else {
        res.status(401).json({ isAuthenticated: false, message: "Not authenticated" });
    }
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({
                success: true, 
                message: 'Authentication successful',
                user: {
                    id: req.user.id,
                    firstName: req.user.first_name,
                    lastName: req.user.last_name,
                    email: req.user.email
                }
            });
        });
    })(req, res, next);
});

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
