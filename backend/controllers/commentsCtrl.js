const debug = require("debug")("meowstagram:backend:controllers:commentsCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');


async function createNewComment(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { content, senderID } = req.body;
    const { postID } = req.params;
    
    const query = `INSERT INTO comments (content, post_id, sender_id) VALUES ($1, $2, $3) RETURNING *;`;
    const newComment = await pool.query(query, [content, postID, senderID]);
    res.json(newComment.rows);

  } catch (err) {
    debug("Error saving: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors:", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      const errorMessage = Object.keys(errors)[0];
      return sendResponse(res, 400, null, errors[errorMessage]);
    }
    sendResponse(res, 500, null, "Error saving comment");
  }
}

async function deleteComment(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { commentID } = req.params;

    const query = `DELETE FROM comments WHERE comments.id = $1 RETURNING *;`;
    await pool.query(query, [commentID]);

    debug('Comment deleted successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting comment");
  }
}

//* get all comments from a post
async function getAllComments(req, res) {
  try {
    const { postID } = req.params;
    const query = `SELECT comments.id, content, date_commented, sender_id, username, profile_pic FROM comments LEFT JOIN users ON users.id = comments.sender_id WHERE comments.post_id = $1 ;`;
    const data = await pool.query(query, [postID]);
    const comments = data.rows;
    sendResponse(res, 200, { comments });
    debug("fetch all comments successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all comments");
  }
}

module.exports = {
  createNewComment,
  deleteComment,
  getAllComments

};