const { Batch } = require("../../models/batchModel");

exports.checkExistingBatch = async (batchName) => {
  return await Batch.findOne({ batchName });
};

exports.createBatch = async (
  batchName,
  subjectIds,
  instructorIds
) => {
  try {
    const batch = new Batch({
      batchName,
      subjectIds,
      instructorIds
    });
    return await batch.save();
  } catch (error) {
    console.error("Create Batch Error:", error);
    return null;
  }
};

exports.updateBatch = async (batchName, updatedBatch) => {
  try {
    return await Batch.findOneAndUpdate(
      { batchName },
      updatedBatch,
      { new: true }
    );
  } catch (error) {
    console.error("Update Batch Error:", error);
    return null;
  }
};

exports.deleteBatch = async (batchName) => {
  return await Batch.findOneAndDelete({ batchName });
};

exports.addStudentToBatch = async (studentId, batchName) => {
  try {
    return await Batch.findOneAndUpdate(
      { batchName },
      { $addToSet: { studentsIds: studentId } },// this is adding studentId if its not already in array
      { new: true }
    );
  } catch (error) {
    console.error("Add Student Error:", error);
    return null;
  }
};
