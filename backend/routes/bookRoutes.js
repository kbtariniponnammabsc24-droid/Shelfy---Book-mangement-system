// Express routes: maps HTTP method + URL to a controller function.
const express = require("express");
const controller = require("../controllers/bookController");

const router = express.Router();

router.get("/", controller.getAllBooks);        // GET    /api/books
router.get("/:id", controller.getBookById);     // GET    /api/books/:id
router.post("/", controller.createBook);        // POST   /api/books
router.put("/:id", controller.updateBook);      // PUT    /api/books/:id
router.delete("/:id", controller.deleteBook);   // DELETE /api/books/:id

module.exports = router;
