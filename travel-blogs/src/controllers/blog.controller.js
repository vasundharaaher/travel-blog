import {
        addBlog,
        deleteBlog,
        getAllBlog,
        getBlogByuser,
        updateBlog,
        uploadBlogPictures,
} from '#services/blog.servive';

export const addBlogHandler = async (req, res) => {
        const response = await addBlog(req);
        res.status(201).json({
                msg: 'Blog added successfully',
                success: true,
                response,
        });
};

export const updateBlogHandler = async (req, res) => {
        console.log('BODY:', req.body);
        console.log('PARAMS:', req.params);
        const response = await updateBlog(req);
        res.status(200).json({
                msg: 'Blog has been updated !',
                success: true,
                response,
        });
};

export const deleteBlogHandler = async (req, res) => {
        const deleteBlogDetails = await deleteBlog(req);
        res.status(200).json({
                msg: 'Blog deleter success',
                success: true,
                deleteBlogDetails,
        });
};

export const getBlogHandler = async (req, res) => {
        const blogs = await getAllBlog(req);
        res.status(200).json({
                msg: 'All Blogs',
                success: true,
                blogs,
        });
};

export const getBlogByuserHandler = async (req, res) => {
        const myblog = await getBlogByuser(req);
        res.status(200).json({
                msg: 'My Blog',
                success: true,
                myblog,
        });
};

export const uploadBlogPicturesHandler = async (req, res) => {
        const blogs = await uploadBlogPictures(req);
        res.status(200).json({
                msg: 'Blog images has been update',
                success: true,
                blogs,
        });
};
