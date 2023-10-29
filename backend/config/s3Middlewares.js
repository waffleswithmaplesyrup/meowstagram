const AWS = require("aws-sdk");
const multer = require("multer");
// const sharp = require("sharp");
// const { Rembg } = require("rembg-node");
const debug = require("debug")("meowstagram:config:uploadToS3");
const { v4: uuidv4 } = require("uuid");
const pool = require('./database');


const AWS_BUCKET_NAME = process.env.BUCKET_NAME;
const AWS_REGION = process.env.BUCKET_REGION;
const AWS_ACCESS_KEY = process.env.BUCKET_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

// debug("s3 object: %o", s3);

const upload = multer({ storage: multer.memoryStorage() }).array("images", 10);

function uploadToS3(req, res, next) {
  const randomIdx = (max) => Math.floor(Math.random() * max);
  const splitUUID = uuidv4().split("-");
  const uniqueID = splitUUID[randomIdx(2)] + "-" + splitUUID[randomIdx(4)];
  debug("generate uuid: %s", uniqueID);

  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ err, message: "Unable to upload" });
    }

    debug("received files in multer: %o", req.files);
    try {
      for (const file of req.files) {
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `${uniqueID}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploaded = await s3.upload(params).promise();
        debug("uploaded: %o", uploaded);

        file.processedImage = {
          key: `${uniqueID}-${file.originalname}`,
        };
        debug("file.processedimage", file.processedImage);
      }

      return next();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error, message: "Error processing image" });
    }
  });
}

async function deleteFromS3(req, res, next) {
  const { postID } = req.params;
  const query = `SELECT * FROM posts WHERE posts.id = $1;`;
  const postToDel = await pool.query(query, [postID]);
  if(!postToDel) {
    res.status(404).send("Post not found");
    return;
  }
  const s3ObjectID = postToDel.rows[0].photo.split('/')[3];
  debug("s3ObjectID virtual:", s3ObjectID);

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: s3ObjectID,
  };

  try {
    await s3.deleteObject(params).promise();
    debug("successfully deleted s3 object");
  } catch (err) {
    console.error(err);
    debug("error deleting from s3: %o", err);
    return res.status(500).json({ err, message: "Error deleting image" });
  }
  return next();
}

async function deleteProfilePicFromS3(req, res, next) {
  const { id } = req.params;
  const query = `SELECT * FROM users WHERE id = $1;`;
  const postToDel = await pool.query(query, [id]);
  if(!postToDel) {
    res.status(404).send("User not found");
    return;
  }
  const picToDel = postToDel.rows[0].profile_pic;
  debug("pic to delete", picToDel);

  if (picToDel) {
    const s3ObjectID = postToDel.rows[0].profile_pic.split('/')[3];
    debug("s3ObjectID virtual:", s3ObjectID);
  
    if (s3ObjectID) {
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: s3ObjectID,
      };
    
      try {
        await s3.deleteObject(params).promise();
        debug("successfully deleted s3 object");
      } catch (err) {
        console.error(err);
        debug("error deleting from s3: %o", err);
        return res.status(500).json({ err, message: "Error deleting image" });
      }
    }
  }
  
  
  return next();
}

module.exports = {
  uploadToS3, 
  deleteFromS3,
  deleteProfilePicFromS3
};