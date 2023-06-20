const express = require('express');
const SearchService = require("../services/search");
const router = express.Router();

const searchService = new SearchService();

router.get('/', (req, res) => {
    const {search, take, skip} = req.query;
    if (+take < 0 || +skip < 0) {
        res.status(500).send("Parameters take and skip can be negative.")
    }
    const result = searchService.search(search, +take, +skip);
    res.status(200).send(result);
});

module.exports = router;
