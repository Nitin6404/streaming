// services/category/index.js
const { checkTeacherExists } = require('../../repositories/auth');
const {
  createCategory: createCategoryRepo,
  getAllCategories,
  getCategoryById,
  updateCategory: updateCategoryRepo,
  getCategoryByname,
} = require('../../repositories/category');
const { uploadSingleFile, deleteFile } = require('../../utils/upload');

/**
 * Create a category
 */
const createCategory = async ({ name, slug, image, description, createdBy }) => {
  if (!name || !slug) {
    return {
      statusCode: 400,
      message: 'Name and slug are required',
      data: null,
    };
  }

  // Check if user is a teacher
  const isTeacher = await checkTeacherExists(createdBy);
  if (!isTeacher) {
    return {
      statusCode: 403,
      message: "Student can't create category",
      data: null,
    };
  }

  // Check if category name already exists
  const existingCategory = await getCategoryByname(name);
  if (existingCategory) {
    return {
      statusCode: 400,
      message: 'Category already exists',
      data: null,
    };
  }

  const newCategory = await createCategoryRepo({
    name,
    slug,
    image, 
    description,
    createdBy,
  });

  return {
    statusCode: 201,
    message: 'Category created successfully',
    data: newCategory,
  };
};

/**
 * Get all categories
 */
const getCategories = async (search, page, limit, start_date, end_date) => {
  const { categories, total, totalPages } = await getAllCategories(
    search,
    page,
    limit,
    start_date,
    end_date
  );

  if (!categories || categories.length === 0) {
    return {
      statusCode: 404,
      message: 'No categories found',
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: 'Categories fetched successfully',
    data: { categories, total, totalPages },
  };
};

/**
 * Get single category by ID
 */
const getSingleCategory = async id => {
  const category = await getCategoryById(id);
  if (!category) {
    return {
      statusCode: 404,
      message: 'Category not found',
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: 'Category fetched successfully',
    data: category,
  };
};

/**
 * Update category
 */
const updateCategory = async (id, data, userId) => {
  if (!id) {
    return { statusCode: 400, message: 'Category id is required', data: null };
  }
  if (!userId) {
    return { statusCode: 400, message: 'User id is required', data: null };
  }

  const isTeacher = await checkTeacherExists(userId);
  if (!isTeacher) {
    return { statusCode: 403, message: "Student can't update category", data: null };
  }

  const category = await getCategoryById(id);
  if (!category) {
    return { statusCode: 404, message: 'Category not found', data: null };
  }

  const categoryData = {
    name: data.name || category.name,
    slug: data.slug || category.slug,
    description: data.description || category.description,
    isVisible: typeof data.isVisible === "boolean" ? data.isVisible : category.isVisible,
    updatedBy: userId, // always set the new updater
  };

  if (data.image) {
    if (category.image?.public_id) {
      await deleteFile(category.image.public_id);
    }
    categoryData.image = data.image;
  }

  const updatedCategory = await updateCategoryRepo(id, categoryData);

  return {
    statusCode: 200,
    message: "Category updated successfully",
    data: updatedCategory,
  };
};



module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
};
