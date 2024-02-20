const express = require('express');
const router = express.Router();
const tablesListService = require('../services/tablesListService');

// Route to fetch all data from the Tables List
router.get('/table', async (req, res) => {
    try {
        const tablesListData = await tablesListService.getAllTables();
        res.status(200).json(tablesListData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
