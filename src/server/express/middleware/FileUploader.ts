import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import util from 'util';
import { EnvUtils } from '../../../utils/EnvUtils';

const maxSize = 2 * 1024 * 1024; // 2 Mb

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, EnvUtils.getFileUploadsPath2());
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
});

// export const FileUploader = (fieldName: string): RequestHandler =>
//   util.promisify(uploadFile.single(fieldName));

export const FileUploader: (req: Request, res: Response) => Promise<void> = util.promisify(
  uploadFile.single('file'),
);
