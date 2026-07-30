const multer = require("multer");

const path = require("path");

// Storage Configuration

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Upload Middleware

const upload = multer({

    storage

});

module.exports = upload;