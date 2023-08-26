import { IUploadService } from '@/interfaces/upload.interface'
import Upload from '@/models/upload.model'

export default class UploadService implements IUploadService {
  async uploadFile(data: IFile): Promise<void> {
    await Upload.create(data)
  }
  async getFiles(): Promise<IFile[]> {
    return await Upload.find()
  }
}
