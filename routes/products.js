const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, ProductController.create);
router.get("/", ProductController.getAll);
router.get("/id/:_id", ProductController.getById);
router.get("/search/:name", ProductController.getProductsByName);
router.delete("/id/:_id", authentication, isAdmin, ProductController.delete);
router.put("/id/:_id", authentication, isAdmin, ProductController.update);
router.put("/review/:_id", authentication, ProductController.insertComment);
module.exports = router;
