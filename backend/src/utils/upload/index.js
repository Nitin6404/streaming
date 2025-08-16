const fs = require('fs/promises');
const { cloudinary_js_config } = require('../../config/cloudinary');

// Upload a single image to Cloudinary
exports.uploadSingleImage = async (filePath, folder = 'categories') => {
  try {
    const result = await cloudinary_js_config.uploader.upload(filePath, {
      folder,
      resource_type: 'image', // ensures only images
    });

    // Delete local file after upload
    await fs.unlink(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(`Image Upload Error: ${error.message}`);
  }
};
