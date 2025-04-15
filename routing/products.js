const express = require("express");

const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");
const productsSlice = require("../store/products");
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get("/", productsController.getProductsView);

router.get("/add", productsController.getAddProductView);

router.post("/add", productsController.addNewProduct);

router.get("/new", productsController.getNewProductView);

router.get('/:name', productsController.getProductView);
router.delete('/:name', productsController.deleteProduct);

module.exports = router;
