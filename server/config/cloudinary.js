import { v2 as cloudinary } from "cloudinary";
const uploadOnCloudinary = async (filePath) => {
  // Configuration for Cloudinary
  // Make sure to set your Cloudinary credentials in environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Upload the file to Cloudinary
    // The file Path should be the path to the file you want to upload
    // You can also specify additional options like folder, resource_type, etc.
    // For example, to upload an image:
    const uploadResult = await cloudinary.uploader.upload(
      filePath,  
    )
    fs.unlinkSync(filePath); // Remove the file after uploading

    return uploadResult.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(filePath); // Remove the file even if upload fails
  }
};

export default uploadOnCloudinary;