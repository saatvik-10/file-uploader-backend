import { Request, Response } from 'express'

export interface IUploadController {
  uploadImage(req: Request, res: Response): Promise<void>
}

export interface IUploadService {
  createImage(data: IFile): Promise<void>
}
