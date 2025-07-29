const {
  checkSubjectExists,
  createSubject: createSubjectInDB,
  updateSubject,
  deleteSubject,
} = require("../../repositories/subject");

exports.createSubject = async (subjectName, code) => {
  if (!subjectName) {
    return {
      statusCode: 400,
      message: "Subject name is required for new Subject",
      data: null,
    };
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

exports.updateExistingSubject = async (subjectName, code, updatedSubject) => {
  if (!subjectName) {
    return {
      statusCode: 400,
      message: "Subject name is required to update Subject",
      data: null,
    };
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

exports.deleteExistingSubject = async (subjectName, code) => {
  if (!subjectName || !code) {
    return {
      statusCode: 404,
      message: "Subject Name or Subject Code is missing",
      data: null,
    };
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
