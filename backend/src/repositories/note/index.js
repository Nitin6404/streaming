const { Note } = require("../../models/notesModel")

exports.checkExistingNotes = async(notesTitle,notesUrl) =>{
     return await Note.findOne({$or:[{notesTitle},{notesUrl}]});

}

exports.createNotes = async(notesTitle,notesUrl,subjectId,streamId,uploadedBy) =>{
    const notes = Note({notesTitle,notesUrl,subjectId,streamId,uploadedBy});
    return await notes.save();
}

exports.readNote = async (notesTitle,subjectId) =>{

    if(!notesTitle){
        return await Note.find({subjectId});
    }else{
        return await Note.find({$or:[{notesTitle},{subjectId}]});
    }
}

exports.updateNote = async (notesTitle,updatedNote) =>{
    return await Note.findOneAndUpdate({notesTitle},updatedNote,{new:true});
}

exports.deleteNote = async (notesTitle)=>{
    return await Note.findOneAndDelete({notesTitle});
}



