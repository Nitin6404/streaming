const { asyncHandler } = require('../../utils/asyncHandler/index');
const ApiResponse = require('../../utils/apiResponse/index');
const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} = require('../../services/category/index');
const { uploadSingleFile } = require('../../utils/upload/index.js');

exports.handleCreateCategory = asyncHandler(async (req, res) => {
  const image = req.file; // single image
  if (!image) {
    return res.json(new ApiResponse(404, null, 'No Image Found', false));
  }

  const imageUrl = await uploadSingleFile(image.path);
  const { name, slug, description, createdBy } = req.body;

  const result = await createCategory({
    name,
    slug,
    image: imageUrl,
    description,
    createdBy, // coming from req.body now
  });

  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleGetAllCategories = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 25, start_date, end_date } = req.query;
  const result = await getCategories(search, page, limit, start_date, end_date);

  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleGetSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Category id is required'));
  }

  const result = await getSingleCategory(id);
  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleUpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const image = req.file; // single image

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Category id is required'));
  }

  const result = await updateCategory(
    id,
    req.body,
    image,
    req.body.updatedBy // taking from req.body instead of req.admin
  );

  if (!result) {
    return res.status(404).json(new ApiResponse(404, null, 'Category not found'));
  }

  const { statusCode, data, message } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
