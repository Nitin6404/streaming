const { asyncHandler } = require('../../utils/asyncHandler/index');
const ApiResponse = require('../../utils/apiResponse/index');
const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} = require('../../services/category/index');
const { uploadSingleImage } = require('../../utils/upload/index.js');

// Create Category
exports.handleCreateCategory = asyncHandler(async (req, res) => {
  const image = req.file; // single image
  if (!image) {
    return res.json(new ApiResponse(404, null, 'No Image Found', false));
  }

  const { url, public_id } = await uploadSingleImage(image.path, 'categories');
  const { name, slug, description, createdBy } = req.body;

  const result = await createCategory({
    name,
    slug,
    image: { url, public_id }, // store both
    description,
    createdBy,
  });

  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

// Get All Categories
exports.handleGetAllCategories = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 25, start_date, end_date } = req.query;
  const result = await getCategories(search, page, limit, start_date, end_date);

  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

// Get Single Category
exports.handleGetSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Category id is required'));
  }

  const result = await getSingleCategory(id);
  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

// Update Category
exports.handleUpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.body.updatedBy;  
  const image = req.file;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Category id is required'));
  }
  if (!userId) {
    return res.status(400).json(new ApiResponse(400, null, 'User id (updatedBy) is required'));
  }

  let imageData = null;
  if (image) {
    const { url, public_id } = await uploadSingleImage(image.path, 'categories');
    imageData = { url, public_id };
  }

  const result = await updateCategory(
    id,
    { ...req.body, ...(imageData ? { image: imageData } : {}) },
    userId
  );

  return res.status(result.statusCode).json(new ApiResponse(result.statusCode, result.data, result.message));
});

