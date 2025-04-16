const multer = require('multer');
const upload = require('../middlewares/upload.middleware');

const uploadFile = (req, res) => {
    const folderName = req.params.folderName || 'uploads';
    req.folderName = folderName;

    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError || err) {
            return res.status(400).json({ message: err.message });
        }

        res.status(200).json({
            message: 'File uploaded successfully!',
            file: req.file,
        });
    });
};

module.exports = uploadFile;
