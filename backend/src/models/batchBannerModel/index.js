const mongoose = require('mongoose');

const productBatchSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String },       
      public_id: { type: String }, 
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'batch',
      required:true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,required:true
    }
    // type: {
    //   type: String,
    //   enum: ['web', 'tablet', 'mobile', 'app'],
    //   required: true,
    // },
  },
  { timestamps: true }
);

const BatchBanner = mongoose.model('BatchBanner', productBatchSchema);

module.exports = BatchBanner;