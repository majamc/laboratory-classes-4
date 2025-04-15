const express = require("express");

const logger = require("../utils/logger");
const { killAplication } = require("../controllers/logoutController");

const router = express.Router();

router.get("/", killAplication);

module.exports = router;
