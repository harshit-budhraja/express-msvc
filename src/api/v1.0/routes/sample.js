const express = require('express');

const sampleRouter = () => {
    const routes = express.Router();

    routes.get('/', async (req, res) => {
        const TableDao = require('../dao/table');
        const allRecords = await TableDao.getAll();
        return res.status(200).send({ message: 'Sample GET', data: allRecords });
    });

    return routes;
}

module.exports = sampleRouter;