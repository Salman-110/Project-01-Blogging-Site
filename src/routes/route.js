const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogController");
const { validateAuthor, validateblog } = require('../middleware/valid');
const { Authentication, Authrization, authorise } = require('../middleware/auth');




router.post("/authors", validateAuthor, authorController.createauthor);
router.post('/login', authorController.authorLogin);

router.post("/blogs", Authentication, validateblog, blogsController.createBlog);
router.get("/blogs", Authentication, blogsController.getBlogs);
router.put("/blogs/:blogId", Authrization, blogsController.updateblogs);
router.delete("/blogs/:blogId", Authentication, Authrization, blogsController.deleteBlogs);
router.delete("/blogsq", Authentication, authorise, blogsController.queryDeleted);






module.exports = router;