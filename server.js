/**
 * Package Imports
 */
const express = require('express');
const app = express();
require("dotenv").config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require("express-session");
const store = new session.MemoryStore();    // Only for development
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require('./database/queries/userQueries');
const { hashPassword, comparePasswords } = require('./util/passwordHash');

/**
 * Router Imports
 */
const usersRouter = require('./routes/userRoutes');
const productsRouter = require('./routes/productRoutes');
const ordersRouter = require('./routes/orderRoutes');


const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

// Session config
app.use(session({
    secret: "ajgabajga",
    cookie: {
        maxAge: 1000 * 60 *60 * 24,
        secure: false,
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


// API Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


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

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (firstName && lastName && email && password) {
        try {
            const hashedPassword = await hashPassword(password);
            if (hashedPassword) {
                await db.createUser(firstName, lastName, email, hashedPassword, res);
            } else {
                console.error('Error while hashing password:', err.message);
                res.status(500).json({ message: err.message });
                return;
            }
        } catch (err) {
            console.error('Error while adding user:', err.message);
            res.status(500).json({ message: err.message });
            return;
        };
    } else {
        res.status(400).json({
            message: "Include all required fields in the request body!",
            requiredFields: ["firstName", "lastName", "email", "password"]
        });
    };
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
