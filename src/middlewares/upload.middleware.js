const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MAX_SIZE = parseInt(process.env.FILE_MAX_SIZE, 10);
const UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
const allowedTypes = process.env.FILE_ALLOWED_TYPES.split(',');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = path.join(UPLOAD_PATH, req.folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_SIZE,
    }
});

module.exports = upload;
