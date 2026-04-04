import {
        addBlogHandler,
        deleteBlogHandler,
        getBlogByuserHandler,
        getBlogHandler,
        updateBlogHandler,
        uploadBlogPicturesHandler,
} from '#controllers/blog.controller';
import multerInstance from '#middlewares/file-upload.middleware';

import express from 'express';

const router = express.Router();

router.post('/blog', addBlogHandler);
router.put('/blog/:blog_id', updateBlogHandler);
router.delete('/blog/:blog_id', deleteBlogHandler);
router.get('/blog/my', getBlogByuserHandler);
router.get('/blogs', getBlogHandler);
router.put(
        '/blog/pictures/:blog_id',
        multerInstance.array('pictures', 5),
        uploadBlogPicturesHandler
);

export default router;
