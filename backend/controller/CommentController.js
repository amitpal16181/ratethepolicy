const { v4: uuidv4 } = require('uuid'); 
const Comment = require('../models/comment');
async function getDummyCommentData(req, res, next) {
    res.status(200).json([
        {
            "_id": "UUID",
            "postId": "postId",
            "userId": "userId",
            "message": "dictatorship++",
        },
    ]);
};
async function fetchAllComments(req, res, next) {
    // populate('postId')
    Comment.find()
    .then((comments)=>{
        res.status(200).json(comments);
    }).catch((error)=>{
        res.status(401).json(error);
    })
};
async function insertNewComment(req, res, next) {
    const {userId,postId,message} = req.body;
    // console.log(req.body);
    const uuid = uuidv4();
    const newCommentObject = new  Comment({
        _id : uuid,
        userId:userId,
        postId:postId,
        message:message
    });
    newCommentObject.save()
    .then((obj)=>{
        res.status(200).json(obj);
    }).catch((error)=>{
        res.status(401).json(error);
    })

}
async function deleteExistingComment(req, res, next) {
    const commentId = req.body.commentId; 
    Comment.findByIdAndDelete(commentId)
    .then((x)=>{
        res.status(200).json(x);
    }).catch((error)=>{
        res.status(401).json(error);
    })

}
module.exports ={
    getDummyCommentData,
    insertNewComment,
    deleteExistingComment,
    fetchAllComments
}
