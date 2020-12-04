const getFileUploadsPath = (): string => {
  return process.env.FILE_UPLOADS_PATH ?? '/';
};

export const EnvUtils = {
  getFileUploadsPath,
};
