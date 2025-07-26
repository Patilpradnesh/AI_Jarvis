import multer from "multer";

// multer is a middleware for handling multipart/form-data, which is used for uploading files
// it is used to handle file uploads in Node.js applications

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/images'); // Specify the destination folder for uploaded files
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname); // Use the original file name
    }
})

const upload =multer({storage}) // Create an instance of multer with the specified storage configuration
export default upload; // Export the multer instance for use in routes