import { BaseResult, ServerException, StatusCode } from '@spetushkou/api-expressjs';
import { Request, Response } from 'express';
import fs from 'fs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { FileUploader } from '../../server/express/middleware/FileUploader';
import { EnvUtils } from '../../utils/EnvUtils';
import { FileEntity } from './FileEntity';

type FileInfo = { name: string; url: string };

export class FileController {
  upload = async (req: Request, res: Response): Promise<void> => {
    try {
      await FileUploader(req, res);

      if (!req.file) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'Please upload a file');
      }

      const fileEntity = ClassTransformer.fromPlain(FileEntity, req.file);

      const response = new BaseResult(`/${fileEntity.path}`);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  list = async (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
      const dirPath = EnvUtils.getFileUploadsPath2();
      fs.readdir(dirPath, (error, files) => {
        if (error) {
          return reject(error);
        }

        const filesInfo: FileInfo[] = [];
        const baseUrl = '/files/download/';
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
      const dirPath = EnvUtils.getFileUploadsPath2();

      res.download(dirPath + fileName, fileName, (error) => {
        if (error) {
          reject(error);
        }
      });
    });
  };
}
