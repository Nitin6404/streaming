const {
  checkExistingNotes,
  createNotes,
  updateNote,
  readNote,
  deleteNote,
} = require("../../repositories/note");

exports.NoteCreation = async (teacherId,
  notesTitle,
  notesUrl,
  subjectId,
  streamId,
  uploadedBy
) => {
  if (!notesTitle || !notesUrl || !subjectId||!teacherId || !streamId || !uploadedBy) {
    return {
      statusCode: 400,
      message: "Note couldn't be created",
      data: null,
    };
  }
  let checkTeacher = await checkTeacherExists(teacherId);
      
          if(checkTeacher==false){
          return {
            data:null,
            message:"Student can't create notes!",
            statusCode:400
          }
        }

  let note = await checkExistingNotes(notesTitle, notesUrl);

  if (note) {
    return {
      statusCode: 409,
      message: "Notes already exists",
      data: null,
    };
  }

  note = await createNotes(
    notesTitle,
    notesUrl,
    subjectId,
    streamId,
    uploadedBy
  );

  if (!note) {
    return {
      statusCode: 500,
      message: "Something went wrong",
      data: null,
    };
  }

  return {
    statusCode: 201,
    message: "Note Created",
    data: note,
  };
};

exports.NoteUpdation = async (teacherId,notesTitle, updatedNote) => {
  if (!notesTitle ||!teacherId|| !updatedNote) {
    return {
      statusCode: 400,
      message: "Note couldn't be updated",
      data: null,
    };
  }let checkTeacher = await checkTeacherExists(teacherId);
      
          if(checkTeacher==false){
          return {
            data:null,
            message:"Student can't update notes!",
            statusCode:400
          }
        }

  let note = await updateNote(notesTitle, updatedNote);

  if (!note) {
    return {
      statusCode: 404,
      message: "Couldnt find the Note",
      data: null,
    };
  }

  return {
    statusCode: 200,
    message: "Note Updated",
    data: note,
  };
};
exports.NoteRead = async (notesTitle, subjectId) => {
  if (!subjectId) {
    return {
      statusCode: 400,
      message: "Search parameters cant be empty",
      data: null,
    };
  }

  let note = await readNote(notesTitle,subjectId);

  if(!note){
    return{
        statusCode:404,
        message:"Note doesnt Exist",
        data:null
    }
  }

  return {
    statusCode:200,
    message:"Note founded",
    data:note
  }
};

exports.NoteDeletion = async (teacherId,notesTitle)=>{
  if (!notesTitle||!teacherId ) {
    return {
      statusCode: 400,
      message: "Note doesnt exist",
      data: null,
    };
  }

  let checkTeacher = await checkTeacherExists(teacherId);
      
          if(checkTeacher==false){
          return {
            data:null,
            message:"Student can't delete notes!",
            statusCode:400
          }
        }
  let note = await deleteNote(notesTitle);

  return {
    data:note,
    message:"Note deleted",
    statusCode:200
  }
}
