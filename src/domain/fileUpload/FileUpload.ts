import { BaseDomain } from '../BaseDomain';

export interface FileUpload extends BaseDomain {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}
