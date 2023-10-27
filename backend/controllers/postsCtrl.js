const debug = require("debug")("meowstagram:backend:controllers:usersCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

//* the posts that show in a user's profile
async function userPosts(req, res) {
  try {
    const { username } = req.params;
    const query = `SELECT posts.id, photo, date_posted, status FROM posts LEFT JOIN users ON users.id = posts.user_id WHERE users.username = $1 ;`;
    const data = await pool.query(query, [username]);
    const posts = data.rows;
    sendResponse(res, 200, { posts });
    debug("fetch all posts by user successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all posts");
  }
}

const viewPost = async (req, res) => {
  try {
    const { username, postID } = req.params;
  
    const query = `SELECT posts.id, photo, caption, date_posted, user_id, status, username, profile_pic FROM posts LEFT JOIN users ON users.id = posts.user_id WHERE posts.id = $1 AND users.username = $2;`;
    const data = await pool.query(query, [postID, username]);
    const post = data.rows;
    sendResponse(res, 200, { post });
    debug("fetch post successfully");

  } catch (err) {
    sendResponse(res, 500, null, "Error getting post");
  }
};

async function createNewPost(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { photo, caption } = req.body;
    const { userID } = req.params;
    const query = `INSERT INTO posts (photo, caption, user_id) VALUES ($1, $2, $3) RETURNING *;`;
    const newPost = await pool.query(query, [photo, caption, userID]);
    res.json(newPost.rows);

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
    sendResponse(res, 500, null, "Error saving post");
  }
}

async function del(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { postID } = req.params;

    const query = `DELETE FROM posts WHERE posts.id = $1 RETURNING *;`;
    await pool.query(query, [postID]);

    debug('Post deleted successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting post");
  }
}


module.exports = {
  userPosts,
  viewPost,
  createNewPost,
  del
};