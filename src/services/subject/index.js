const { checkSubjectExists, createSubject: createSubjectInDB } = require("../../repositories/subject");

exports.createSubject = async (subjectName, code) => {
  if (!subjectName) {
    return {
      statusCode: 400,
      message: "Subject name is required for new Subject",
      data: null,
    };
  }

  let subject = await checkSubjectExists(subjectName,code);

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
