const AWS = require("aws-sdk");
const multer = require("multer");
// const sharp = require("sharp");
// const { Rembg } = require("rembg-node");
const debug = require("debug")("meowstagram:config:uploadToS3");
const { v4: uuidv4 } = require("uuid");
// const Wardrobe = require("../models/wardrobeModel");

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

debug("s3 object: %o", s3);