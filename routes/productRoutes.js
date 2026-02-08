const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/productController");

router.post("/", auth, ctrl.createProduct);
router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProductById);
router.put("/:id", auth, ctrl.updateProduct);
router.delete("/:id", auth, ctrl.deleteProduct);

module.exports = router;
