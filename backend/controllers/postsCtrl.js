const debug = require("debug")("meowstagram:backend:controllers:postsCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');
const uuid = require('uuid');

//* the posts that show in a user's profile
async function userPosts(req, res) {
  try {
    const { username } = req.params;
    const query = `SELECT username, profile_pic, bio, posts.id, photo, date_posted, status FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE users.username = $1 ;`;
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

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  const { files } = req;
  const imgURLs = files.map((file) => {
    return `${AWS_S3_OBJECT_URL}/${file.processedImage.key}`;
  });
  debug("image converted to url:", imgURLs);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", imageURLs: imgURLs });
}

async function createNewPost(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { photo, caption } = req.body;
    const { userID } = req.params;
    const uniqueId = uuid.v4();
    const query = `INSERT INTO posts (id, photo, caption, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const newPost = await pool.query(query, [uniqueId, photo, caption, userID]);
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

async function editCaption(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { postID } = req.params;
    const { caption } = req.body;

    const query = `UPDATE posts SET caption = $1 WHERE posts.id = $2 RETURNING *;`;
    await pool.query(query, [caption, postID]);

    debug('Post updated successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error updating post");
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
  uploadImg,
  createNewPost,
  editCaption,
  del
};