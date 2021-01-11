import { BaseResult, ServerException, StatusCode } from '@spetushkou/api-expressjs';
import { Request, Response } from 'express';
import fs from 'fs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { FileUploader } from '../../server/express/middleware/FileUploader';
import { EnvUtils } from '../../utils/EnvUtils';
import { FileEntity } from './FileEntity';
import { FileInfo } from './FileInfo';
import { FileQueryEntity } from './FileQueryEntity';

const baseUrl = '/files/download/';

export class FileController {
  findAll = async (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
      const dirPath = EnvUtils.getFileUploadsPath();
      fs.readdir(dirPath, (error, files) => {
        if (error) {
          return reject(error);
        }

        const filesInfo: FileInfo[] = [];
        files.forEach((file) => {
          filesInfo.push({
            name: file,
            url: baseUrl + file,
          });
        });

        const response = new BaseResult(filesInfo);
        res.status(StatusCode.OK).json(response);
      });
    });
  };

  download = async (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
      const fileName = req.params.name;
      const dirPath = EnvUtils.getFileUploadsPath();

      res.download(dirPath + fileName, fileName, (error) => {
        if (error) {
          reject(error);
        }
      });
    });
  };

  upload = async (req: Request, res: Response): Promise<void> => {
    try {
      const fileQueryEntity = ClassTransformer.fromPlain(FileQueryEntity, req.query);
      if (!fileQueryEntity.field) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'File field is not defined');
      }

      await FileUploader(fileQueryEntity)(req, res);
      if (!req.file) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'Please upload a file');
      }

      const fileEntity = ClassTransformer.fromPlain(FileEntity, req.file);
      const fileInfo: FileInfo = {
        name: fileEntity.filename,
        url: baseUrl + fileEntity.filename,
      };

      const response = new BaseResult(fileInfo);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
