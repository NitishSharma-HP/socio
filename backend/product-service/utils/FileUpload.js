import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const uploadPath = path.resolve(__dirname, '../utils/uploads'); // Adjust the path as per your project structure
        const uploadPath = '/Users/nitishsharma/Desktop/socio/frontend/public/resources'; // path to asset folder given for testing
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;