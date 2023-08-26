import { IUploadController } from '@/interfaces/upload.interface'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default class UploadController implements IUploadController {
  async uploadImage(req: Request, res: Response) {
    try {
      res.status(StatusCodes.CREATED).json({
        url: req.fileData.url,
      })
      return
    } catch (err) {
      console.error(err)
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
