const { Subject } = require("../../models/subjectModel");

// repo

exports.createSubject = async (subjectName, code) => {
  try {
    const subject = Subject({ subjectName, code });

    return await subject.save();
  } catch (err) {
    console.error("Create subject error:", err);
    return null;
  }
};

exports.checkSubjectExists = async (subjectName,code) => {
  try {
    return await Subject.findOne({ subjectName },{code});
  } catch (error) {
    console.error("finding subject error:", err);
    return null;
  }
};

// repositories/subject.js

exports.updateSubject = async (updatedSubject, findSubjectName) => {
  try {
    const updateFields = {};

    if (updatedSubject.subjectName) updateFields.subjectName = updatedSubject.subjectName;
    if (updatedSubject.code) updateFields.code = updatedSubject.code;

    return await Subject.findOneAndUpdate(
      { subjectName: findSubjectName },
      updateFields,
      { new: true }
    );
  } catch (error) {
    console.error("Updating Subject Error:", error);
    return null;
  }
};

exports.subject = async (subjectName) =>{
  return await Subject.find()
}

exports.deleteSubject= async(subjectName,code) =>{
  try {
    return await Subject.findOneAndDelete({subjectName,code});
    
  } catch (error) {
    console.error(error);
    return null;        
  }
}