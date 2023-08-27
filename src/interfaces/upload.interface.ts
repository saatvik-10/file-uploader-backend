import { Request, Response } from 'express'

export interface IUploadController {
  uploadFile(req: Request, res: Response): Promise<void>
  getFiles(req: Request, res: Response): Promise<void>
}

export interface IUploadService {
  uploadFile(data: IFile): Promise<void>
  getFiles(folder: string): Promise<IFile[]>
}
