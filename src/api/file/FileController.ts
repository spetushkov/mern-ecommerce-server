import { BaseResult, FileUploader, ServerException, StatusCode } from '@spetushkou/expressjs';
import { Request, Response } from 'express';
import fs from 'fs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { EnvUtils } from '../../env/EnvUtils';
import { File } from './File';
import { FileEntity } from './FileEntity';
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

        const filesInfo: File[] = [];
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
          return reject(error);
        }
      });
    });
  };

  async upload(req: Request, res: Response): Promise<void> {
    try {
      const fileQueryEntity = ClassTransformer.fromPlain(FileQueryEntity, req.query);
      if (!fileQueryEntity.field) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'File field is not defined');
      }

      const dirPath = EnvUtils.getFileUploadsPath();
      const fileTypeFilter = /jpg|jpeg|png/;
      await FileUploader(fileQueryEntity, dirPath, fileTypeFilter)(req, res);
      if (!req.file) {
        throw ServerException.create(StatusCode.BAD_REQUEST, 'Please upload a file');
      }

      const fileEntity = ClassTransformer.fromPlain(FileEntity, req.file);
      const file: File = {
        name: fileEntity.filename,
        url: baseUrl + fileEntity.filename,
      };

      const response = new BaseResult(file);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
