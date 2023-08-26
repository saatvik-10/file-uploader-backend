import { IUploadController } from '@/interfaces/upload.interface'
import UploadService from '@/services/upload.service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const uploadService = new UploadService()
export default class UploadController implements IUploadController {
  async uploadFile(req: Request, res: Response) {
    try {
      res.status(StatusCodes.CREATED).json(req.fileData)
      return
    } catch (err) {
      console.error(err)
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
  async getFiles(req: Request, res: Response) {
    try {
      res.send(await uploadService.getFiles())
    } catch (err) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
