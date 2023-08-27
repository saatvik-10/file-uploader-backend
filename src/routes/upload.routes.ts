import UploadController from '@/controllers/upload.controller'
import { uploadSingleS3 } from '@/middlewares/multer.middleware'
import { Router } from 'express'

const router = Router()

const { uploadFile, getFiles } = new UploadController()

router.post('/:folder', uploadSingleS3(), uploadFile)
router.get('/:folder', getFiles)

export default router
