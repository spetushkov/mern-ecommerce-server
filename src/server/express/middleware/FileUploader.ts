import { SizeUtils } from '@spetushkou/expressjs';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import util from 'util';
import { FileQueryEntity } from '../../../api/file/FileQueryEntity';
import { ConfigUtils } from '../../../env/EnvUtils';

const imageFileTypeRegExp = /jpg|jpeg|png/;

const validateFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
  fileType: RegExp,
) => {
  const extName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  }

  cb(new Error(`Invalid file type, valid types: ${fileType}`));
};

export const FileUploader = (
  payload: FileQueryEntity,
): ((req: Request, res: Response) => Promise<void>) => {
  const { field = 'file', limitFileSize = 2, imageFileType = false } = payload;
  const fileSize = limitFileSize ? { fileSize: SizeUtils.toMb(limitFileSize) } : {};
  const limits = {
    ...fileSize,
  };

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, ConfigUtils.getFileUploadsPath());
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const uploadFile = multer({
    storage,
    limits,
    fileFilter: function (req, file, cb) {
      if (imageFileType) {
        validateFileType(file, cb, imageFileTypeRegExp);
      }
      cb(null, true);
    },
  }).single(field);

  return util.promisify(uploadFile);
};
