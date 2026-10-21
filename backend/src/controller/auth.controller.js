
const singupmodel = require('../models/singup.model');
const jwt = require('jsonwebtoken');

// Cookie settings for Vercel frontend + Render backend
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
};

async function singup(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        const emailisalreadythere = await singupmodel.findOne({ email });

        if (emailisalreadythere) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

        const user = await singupmodel.create({
            email,
            password,
            confirmPassword
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.jwturl
        );

        res.cookie('token', token, cookieOptions);

        return res.status(201).json({
            message: 'Signup successful',
            user: {
                email: user.email,
                userID: user._id
            }
        });

    } catch (error) {
        console.error('Signup error:', error);

        return res.status(500).json({
            message: 'Signup failed'
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const useristhere = await singupmodel
            .findOne({ email })
            .select('+password');

        if (!useristhere) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });
        }

        const passwordverification =
            await useristhere.compare(password);

        if (!passwordverification) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });
        }

        const token = jwt.sign(
            {
                id: useristhere._id,
                email: useristhere.email
            },
            process.env.jwturl
        );

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            message: 'Login successful',
            user: {
                email: useristhere.email,
                userID: useristhere._id
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            message: 'Login failed'
        });
    }
}

async function logout(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    return res.status(200).json({
        message: 'Logout successful'
    });
}

module.exports = {
    singup,
    logout,
    login
};
