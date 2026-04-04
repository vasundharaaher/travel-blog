import {
        updateUserHandler,
        updateUserProfilePicHandler,
} from '#controllers/user.controller';
import multerInstance from '#middlewares/file-upload.middleware';
import express from 'express';

const router = express.Router();

router.post('/user', updateUserHandler);
router.put(
        '/user/upload',
        multerInstance.single('profile_pic'),
        updateUserProfilePicHandler
);

export default router;
