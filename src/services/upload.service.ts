import { IUploadService } from '@/interfaces/upload.interface'
import Upload from '@/models/upload.model'

export default class UploadService implements IUploadService {
  async createImage(data: IFile): Promise<void> {
    await Upload.create(data)
  }
}
