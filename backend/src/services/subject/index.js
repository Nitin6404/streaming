//services/subject/index.js
const { checkTeacherExists } = require("../../repositories/auth");
const {
  checkSubjectExists,
  createSubject: createSubjectInDB,
  updateSubject,
  deleteSubject,
} = require("../../repositories/subject");

exports.createSubject = async (teacherId,subjectName, code) => {
  
  if (!subjectName) {
    return {
      statusCode: 400,
      message: "Subject name is required for new Subject",
      data: null,
    };
  }

  let checkTeacher = await checkTeacherExists(teacherId);

  if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't create subject!",
      statusCode:400
    }
  }

  let subject = await checkSubjectExists(subjectName, code);

  if (subject) {
    return {
      statusCode: 200,
      message: "Subject already exists",
      data: subject,
    };
  }



  subject = await createSubjectInDB(subjectName, code);

  if (!subject) {
    return {
      statusCode: 500,
      message: "Failed to create Subject",
      data: null,
    };
  }

  return {
    statusCode: 201,
    message: "Subject created successfully",
    data: subject,
  };
};

exports.updateExistingSubject = async (teacherId,subjectName, code, updatedSubject) => {
  if (!subjectName) {
    return {
      statusCode: 400,
      message: "Subject name is required to update Subject",
      data: null,
    };
  }

  let checkTeacher = await checkTeacherExists(teacherId);

  if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't update subject!",
      statusCode:400
    }
  }

  const subject = await checkSubjectExists(subjectName, code);

  if (!subject) {
    return {
      statusCode: 404,
      message: "No such subject exists",
      data: null,
    };
  }

  if (
    (updatedSubject.subjectName &&
      updatedSubject.subjectName !== subjectName) ||
    (updatedSubject.code && updatedSubject.code !== code)
  ) {
    const doesUpdateSubjectExists = await checkSubjectExists(
      updatedSubject.subjectName || subjectName,
      updatedSubject.code || code
    );

    if (doesUpdateSubjectExists) {
      return {
        statusCode: 409,
        message: "Another subject with the updated name/code already exists",
        data: null,
      };
    }
  }

  const updated = await updateSubject(updatedSubject, subjectName);

  if (!updated) {
    return {
      statusCode: 500,
      message: "Failed to update subject",
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: "Subject updated successfully",
    data: updated,
  };
};

exports.deleteExistingSubject = async (teacherId,subjectName, code) => {
  if (!subjectName || !code) {
    return {
      statusCode: 404,
      message: "Subject Name or Subject Code is missing",
      data: null,
    };
  }

  let checkTeacher = await checkTeacherExists(teacherId);

  if(checkTeacher==false){
    return {
      data:null,
      message:"Student can't delete subject!",
      statusCode:400
    }
  }

  const subject = await checkSubjectExists(subjectName, code);

  if (!subject) {
    return {
      statusCode: 404,
      message: "Subject Not found",
      data: null,
    };
  }

  const deletedSubject = await deleteSubject(subjectName, code);

  if (deletedSubject) {
    return {
      statusCode: 200,
      message: "Subject Deleted",
      data: null,
    };
  }

  return {
    statusCode: 500,
    message: "Failed to delete subject",
    data: null,
  };
};

exports.readExistingSubject = async (subjectName,code)=>{
  const subject = await checkSubjectExists(subjectName,code);

  if(!subject){
    return {
      data:null,
      message:"Subject not found!",
      statusCode:404
    }
  }

  return {
    data:subject,
    message:"Subject founded!",
    statusCode:200
  }
}