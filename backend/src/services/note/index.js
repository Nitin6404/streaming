const {
  checkExistingNotes,
  createNotes,
  updateNote,
  readNote,
  deleteNote,
} = require("../../repositories/note");

exports.NoteCreation = async (
  notesTitle,
  notesUrl,
  subjectId,
  streamId,
  uploadedBy
) => {
  if (!notesTitle || !notesUrl || !subjectId || !streamId || !uploadedBy) {
    return {
      statusCode: 400,
      message: "Note couldn't be created",
      data: null,
    };
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

exports.NoteUpdation = async (notesTitle, updatedNote) => {
  if (!notesTitle || !updatedNote) {
    return {
      statusCode: 400,
      message: "Note couldn't be updated",
      data: null,
    };
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

exports.NoteDeletion = async (notesTitle)=>{
  if (!notesTitle ) {
    return {
      statusCode: 400,
      message: "Note doesnt exist",
      data: null,
    };
  }
  let note = await deleteNote(notesTitle);

  return {
    data:note,
    message:"Note deleted",
    statusCode:200
  }
}
