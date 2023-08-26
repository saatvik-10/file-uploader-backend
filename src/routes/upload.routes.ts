import UploadController from '@/controllers/upload.controller'
import { uploadSingleS3 } from '@/middlewares/multer.middleware'
import { Router } from 'express'

const router = Router()

const { uploadImage } = new UploadController()

router.post('/', uploadSingleS3(), uploadImage)

export default router
