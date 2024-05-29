const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;

// Cloudinary configurations
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const options = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, options, (error, result) => {
            if(result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }

            console.log(error.message);
            return reject({ message: error.message });
        })

    })
}