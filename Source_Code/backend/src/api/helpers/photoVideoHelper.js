require("dotenv").config();
const { env } = require("process");

const cloudinary = require("../../configs/cloudinary");

// Store videos and photo to cloudinary:
exports.storePhotoVideoToCloudinary = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: env.CLOUDINARY_FOLDER_NAME,
        });
        console.log("Upload successful:", result);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
