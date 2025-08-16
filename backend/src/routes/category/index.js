const express = require('express');
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
} = require('../../controllers/category/index.js');
const { validateCreateCategory } = require('../../validators/category/index.js');
const { validateRequest } = require('../../middleware/validateRequest/index');
const { uploadSingleImage } = require('../../config/multer.js');
// const { isAdmin } = require('../../middleware/auth/index.js');

const router = express.Router();

/**
 * @swagger
 * /api/category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Polytechnic
 *               slug:
 *                 type: string
 *                 example: polytechnic
 *               description:
 *                 type: string
 *                 example: Polytechnic description
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post(
  '/create-category',
  // isAdmin,
  uploadSingleImage,
  validateCreateCategory,
  validateRequest,
  handleCreateCategory
);

/**
 * @swagger
 * /api/category/get-all-category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search query
 *         type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         type: number
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of results per page
 *         type: number
 *       - name: start_date
 *         in: query
 *         required: false
 *         description: Start date
 *         type: string
 *       - name: end_date
 *         in: query
 *         required: false
 *         description: End date
 *         type: string
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
router.get('/get-all-category', handleGetAllCategories);

/**
 * @swagger
 * /api/category/get-category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Category ID
 *         type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 */
router.get('/get-category/:id', handleGetSingleCategory);

/**
 * @swagger
 * /api/category/update-category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Category ID
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               isVisible:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put(
  '/update-category/:id',
  uploadSingleImage,
  // isAdmin,
  validateRequest,
  handleUpdateCategory
);

module.exports = router;
