const express = require('express');
const { handleBatchCreation } = require('../../controllers/batch');
const router = express.Router();

router.route("/create-batch").post(handleBatchCreation);

module.exports = router;