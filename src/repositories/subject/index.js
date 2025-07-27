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
