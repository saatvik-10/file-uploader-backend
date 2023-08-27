import { getFileKey, getFileUrl, modifyFileName } from '@/lib/s3.lib'
import S3Service from '@/services/s3.service'
import UploadService from '@/services/upload.service'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Multer from 'multer'

const s3Service = new S3Service()
const uploadService = new UploadService()
const memoryStorage = Multer.memoryStorage()

const multer = Multer({
  storage: memoryStorage,
})

export const singleUpload = (fieldName = 'file') => {
  return multer.single(fieldName)
}

export const multiUpload = (fieldName = 'files', maxCount = 3) => {
  return multer.array(fieldName, maxCount)
}

export const uploadSingleS3 = (fieldName = 'file') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadMiddleware = multer.single(fieldName)
      //manually calling the multer middleware
      uploadMiddleware(req, res, async () => {
        if (!req.file) {
          res.sendStatus(StatusCodes.BAD_REQUEST)
          return
        }

        const file = req.file.buffer
        //modifying filename with a unique code to avoid filename collisions
        const fileName = modifyFileName(req.file.originalname)

        const s3Data = await s3Service.uploadImage(file, fileName)
        const fileURL = getFileUrl(fileName)
        const fileData: IFile = {
          ETag: s3Data.ETag,
          key: getFileKey(fileName),
          url: fileURL,
          name: req.file.originalname,
          folder: req.params.folder ?? 'files',
        }
        await uploadService.uploadFile(fileData)
        req.fileData = fileData
        next()
      })
    } catch (err) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
