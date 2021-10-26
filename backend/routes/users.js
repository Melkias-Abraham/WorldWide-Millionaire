const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    authenticateUser
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/posts', (req, res) => {
        getUsersPosts()
            .then((usersPosts) => {
                const formattedPosts = getPostsByUsers(usersPosts);
                res.json(formattedPosts);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/register', (req, res) => {

        const {
            name,
            email,
            password
        } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        if (name === "" ||email === "" || password === "") {
            return res.status(401).json({
                msg: "Fields cannot be blank."
            });
        }


        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.status(401).json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(name, email, hashedPassword)
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })
    router.post('/login', (req, res) => {

        const {
            email,
            password
        } = req.body;


        if (email === "" || password === "") {
            return res.status(401).json({
                msg: "Fields cannot be blank."
            });
        }

        authenticateUser(email, password)
            .then(user => {

                if (!user) {
                    res.status(401).json({
                        msg: 'Wrong username or password'
                    });
                } else {
                    return res.status(200).json({id: user.id, name: user.name, email:user.email, password:user.password})
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};

