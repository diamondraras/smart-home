//Require after path
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, req.user._id + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        console.log(file.mimetype)
        var constraints = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'video/x-flv', 'video/mp4', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-matroska']
        if (!constraints.includes(file.mimetype)) {
            req.fileValidationError = 'File extension not allowed';
            return cb(null, false, new Error('Filetype error'));
        }
        cb(null, true);
    }
});

module.exports = upload;