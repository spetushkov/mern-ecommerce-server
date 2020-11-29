import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import { EnvUtils } from '../../../utils/EnvUtils';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, EnvUtils.getFileUploadsPath());
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const validateFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname.toLocaleLowerCase()));
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    validateFileType(file, cb);
  },
});

// will create a req.file object
// fieldName - a filed name from a client's form data
export const FileUploader = (fieldName: string): RequestHandler => upload.single(fieldName);
