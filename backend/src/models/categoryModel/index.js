const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true , unique:true },
    slug: { type: String, required: true, unique: true },
    image: {
      url: { type: String },       // Cloudinary secure URL
      public_id: { type: String }, // Cloudinary public_id for management
    },
    description: { type: String },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
