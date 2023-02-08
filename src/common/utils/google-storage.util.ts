import { Storage } from '@google-cloud/storage';
import { join } from 'path';

const bucketName = 'example-pncr-bucket';
const baseUrl = `https://storage.googleapis.com`;

const bucket = new Storage({
  projectId: process.env.GS_PROJECT_ID,
  credentials: {
    client_email: process.env.GS_CLIENT_EMAIL,
    private_key: process.env.GS_PRIVATE_KEY,
  },
}).bucket(bucketName);

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
  const uri = new URL(baseUrl);
  if (baseUrl.endsWith(bucket.name)) {
    uri.pathname = join(directory, image.name);
  } else {
    uri.pathname = join(bucket.name, directory, image.name);
  }
  return uri.toString();
};

//   async download(filePath: string) {
//     const file = bucket.file(filePath);
//     await file.download();
//   }
