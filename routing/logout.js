const express = require("express");
const logoutController = require('../controllers/logoutController');

const { LOGOUT_LINKS } = require("../constants/navigation");

const router = express.Router();

router.get("/", logoutController.getLogoutView);

module.exports = router;
