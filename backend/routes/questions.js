const express = require('express');
const router = express.Router();
const {
    getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
    getContinentBasedQuestions,

}) => {
    /* GET users listing. */
    router.get('/:id', (req, res) => {

        const {
            id
        } = req.params;
        getContinentBasedQuestions(id)
            .then((questions) => {
            // console.log(users)
             return res.json(questions)
             
    })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // router.get('/posts', (req, res) => {
    //     getUsersPosts()
    //         .then((usersPosts) => {
    //             const formattedPosts = getPostsByUsers(usersPosts);
    //             res.json(formattedPosts);
    //         })
    //         .catch((err) => res.json({
    //             error: err.message
    //         }));
    // });

    // router.post('/', (req, res) => {

    //     const {
    //         name
    //     } = req.body;

    //         getUserByEmail(name)
    //         .then(user => {

    //             if (user) {
    //                 res.json({
    //                     msg: 'Sorry, a user account with this email already exists'
    //                 });
    //             } else {
    //                 return addUser(name)
    //             }
    //         })
    //         .then(newUser => res.json(newUser))
    //         .catch(err => res.json({
    //             error: err.message
    //         }));
    // })

    return router;
};

