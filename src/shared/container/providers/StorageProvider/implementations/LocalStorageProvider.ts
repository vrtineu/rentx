import fs from 'fs/promises';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async saveFile(file: string, folder: string): Promise<string> {
    await fs.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.stat(filePath);
    } catch {
      return;
    }
    await fs.unlink(filePath);
  }
}

export { LocalStorageProvider };
