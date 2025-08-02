const { NoteCreation, NoteUpdation, NoteRead, NoteDeletion } = require("../../services/note");
const {asyncHandler} = require("../../utils/asyncHandler/index")
const ApiResponse =require("../../utils/apiResponse");

exports.handleNoteCreation = asyncHandler(async(req,res)=>{
    const {notesTitle,notesUrl,subjectId,streamId,uploadedBy}=req.body;

    const result = await NoteCreation(notesTitle,notesUrl,subjectId,streamId,uploadedBy);

    const {message,data,statusCode =200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message) );
})

exports.handleNoteUpdation = asyncHandler(async(req,res)=>{
    const {notesTitle,updatedNote} = req.body;

    const result = await NoteUpdation(notesTitle,updatedNote);

    const {message,data,statusCode=200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})

exports.handleNoteRead = asyncHandler(async(req,res)=>{
    const {notesTitle,subjectId} = req.body;
    const result = await NoteRead(notesTitle,subjectId);

    const {data,message,statusCode} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));

})

exports.handleNoteDeletion = asyncHandler(async(req,res)=>{
    const {notesTitle} = req.body;

    const result = await NoteDeletion(notesTitle);

    const {data, message,statusCode = 200} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message));
})


