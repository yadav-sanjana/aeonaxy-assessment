import { v2 as cloudinary } from 'cloudinary';
const multer = require('multer');

const cloud_name = process.env.CLOUD_NAME
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true
});

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
