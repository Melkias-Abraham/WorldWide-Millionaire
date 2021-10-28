const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = ({
    getScores,
    upsertScores
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getScores()
            .then((scores) => res.json(scores))
            .catch((err) => res.json({
                error: err.message
            }));
    });


    router.post('/', (req, res) =>{


        const {
            userId,
            score
        } = req.body;


        if (userId === "" || score === "" || !userId) {
            return res.status(401).json({
                msg: "Fields cannot be blank."
            });
        }

        const numScore = parseInt(score)
        upsertScores(userId, numScore)
            .then(scoreData => {
                if (!scoreData) {
                    res.status(401).json({
                        msg: 'Wrong username or password'
                    });
                } else {
                    return res.status(200).json(scoreData)
                }
            })
            .catch(err => err);
    })

    return router;
};

