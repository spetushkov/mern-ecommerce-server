const getFileUploadsPath = (): string => {
  return process.env.FILE_UPLOADS_PATH ? process.env.FILE_UPLOADS_PATH : '/';
};

const getFileUploadsPath2 = (): string => {
  return 'resources/static/assets/uploads/';
};

export const EnvUtils = {
  getFileUploadsPath,
  getFileUploadsPath2,
};
