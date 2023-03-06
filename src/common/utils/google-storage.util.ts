import { Storage } from '@google-cloud/storage';
import { extname, join } from 'path';
import 'dotenv/config';

const bucketName = 'wegether_app';
const baseUrl = `https://storage.googleapis.com`;
const bucket = new Storage({
  projectId: process.env.GS_PROJECT_ID,
  credentials: {
    client_email: process.env.GS_CLIENT_EMAIL,
    private_key: process.env.GS_PRIVATE_KEY,
  },
}).bucket(bucketName);

export const editFileName = async (id: string, file) => {
  const ext = extname(file?.originalname);
  return id + ext;
};

export const upload = async (
  directory: string,
  image: {
    name: string;
    buffer: Buffer;
  },
  metadata?: object,
) => {
  const filePath = join(directory, image.name);
  const file = bucket.file(filePath);
  const options = metadata ? { metadata } : undefined;

  await file.save(image.buffer, options);
  const uri = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
  });

  return uri.toString();
};
