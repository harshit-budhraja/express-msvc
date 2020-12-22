const express = require('express');

const sampleRouter = () => {
    const routes = express.Router();

    routes.get('/', (req, res) => {
        return res.status(200).send({message: 'Sample GET'});
    });

    return routes;
}

module.exports = sampleRouter;