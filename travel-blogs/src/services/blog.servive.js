import db from '#db';
import { numberSchema } from '#validation/common.validation';
import {
        addBlogSchema,
        updateBlogSchema,
        allBlogsQueryScheme,
} from '#validation/blog.validation';
import { deleteFile } from '#utils/helper';

export const addBlog = async (req) => {
        const payload = addBlogSchema.parse(req.body);
        const blogDetails = await db.travel_blog.create({
                data: {
                        ...payload,
                        pictures: '',
                        user_id: req.user.user_id,
                },
        });

        return blogDetails;
};

export const updateBlog = async (req) => {
        const blog_id = numberSchema.parse(req.params.blog_id);
        const payload = updateBlogSchema.parse(req.body);
        const blogDetails = await db.travel_blog.update({
                data: payload,
                where: {
                        blog_id, // blog_id: blog_id
                        user_id: req.user.user_id,
                },
        });
        return blogDetails;
};

export const deleteBlog = async (req) => {
        const blog_id = numberSchema.parse(req.params.blog_id);
        const blogDetails = await db.travel_blog.delete({
                where: {
                        blog_id,
                        user_id: req.user.user_id,
                },
        });

        return blogDetails;
};

export const getAllBlog = async (req) => {
        // const queryString = req.query;
        const { filterType, searchTerm, sortOrder } = allBlogsQueryScheme.parse(
                req.query
        );
        // console.log(queryString);
        const whereClause = {};
        if (filterType === 'my') {
                whereClause.user_id = req.user.user_id;
        }
        if (searchTerm) {
                whereClause.place_name = searchTerm;
        }
        // const responce = await db.$queryRaw`select * from \`travel-blog\``;
        const allBlog = await db.travel_blog.findMany({
                include: {
                        users: {
                                select: {
                                        user_id: true,
                                        first_name: true,
                                        last_name: true,
                                        profile_pic: true,
                                },
                        },
                },
                where: whereClause,
                orderBy: {
                        place_name: sortOrder,
                },
        });
        return allBlog;
};

export const getBlogByuser = async (req) => {
        const user = req.user;

        const myblog = await db.travel_blog.findMany({
                where: {
                        user_id: user.user_id,
                },
        });

        return myblog;
};

export const uploadBlogPictures = async (req) => {
        // const fileNameWrite = deleteFile()
        const previousBlogDetails = await db.travel_blog.findFirst({
                where: {
                        blog_id: req.blog_id,
                },
        });
        if (previousBlogDetails.pictures) {
                previousBlogDetails.pictures
                        .split(', ')
                        .forEach((pic) => deleteFile(`./public/images/${pic}`));
        }

        const blogDetails = await db.travel_blog.update({
                data: {
                        pictures: req.uniqueName,
                },
                where: {
                        blog_id: req.blog_id, // blog_id: blog_id
                        user_id: req.user.user_id,
                },
        });
        return blogDetails;
};
