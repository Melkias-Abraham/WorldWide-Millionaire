const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = ({
    getScores,
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getScores()
            .then((scores) => res.json(scores))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    return router;
};

