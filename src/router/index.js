import express from 'express';
import { checkMiddleWare, loginUser, registerUser, uploadImageTest } from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';
import { UploadImage } from '../middleware/imageUpload.js';
export const router = express.Router();

router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.get('/check-route',protect,checkMiddleWare);
router.post('/profile',protect,UploadImage,uploadImageTest)


export default router;