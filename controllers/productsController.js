const Product = require('../models/Product');
const { STATUS_CODE } = require('../constants/statusCode');
const MENU_LINKS = require('../constants/navigation');

const getProductsView = (_request, response) => {
  const products = Product.getAll();
  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
  });
  }

const getAddProductView = (_request, response) => {
    response.render("add-product.ejs", {
      headTitle: "Shop - Add product",
      path: "/add",
      menuLinks: MENU_LINKS,
      activeLinkPath: "/products/add",
    });
  };

const addNewProduct = (request, response) => {
    const { name, description } = request.body;
    const newProduct = new Product(name, description);
    Product.add(newProduct);
    response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

const getNewProductView = (_request, response) => {
    const lastProduct = Product.getLast();
    response.render("new-product.ejs", {
        headTitle: "Shop - New Product",
        path: "/new",
        menuLinks: MENU_LINKS,
        activeLinkPath: "/products/new",
        newestProduct: lastProduct,
      });
};

const getProductView = (req, res) => {
    const { name } = req.params;
    const product = Product.findByName(name);
    if (!product) {
      return res.status(STATUS_CODE.NOT_FOUND).send("Product not found");
    }
    res.render("product.ejs", {
        headTitle: `Shop - ${product.name}`,
        path: "/product",
        menuLinks: MENU_LINKS,
        activeLinkPath: "/products",
        product: product,
      });
};

const deleteProduct = (req, res) => {
    const { name } = req.params;
    const success = Product.deleteByName(name);
    if (success) {
        res.status(STATUS_CODE.OK).json({ success: true });
    } else {
        res.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: "Product not found" });
    }
};

module.exports = {
    getProductsView,
    getAddProductView,
    addNewProduct,
    getNewProductView,
    getProductView,
    deleteProduct
}