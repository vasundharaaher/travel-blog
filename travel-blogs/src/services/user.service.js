import { updateUserSchema } from '#validation/user.validation';
import db from '#db';
import { generateToken, deleteFile } from '#utils/helper';
import fs from 'fs';
import { error } from 'console';

// profile pic upload
export const updateProfile = async (req) => {
        const payload = updateUserSchema.parse(req.body);
        delete payload.password;
        const userDetails = await db.users.update({
                data: payload,
                where: {
                        user_id: req.user.user_id,
                },
        });
        const token = generateToken(userDetails);
        return token;
};

// update profile
export const updateProfilePic = async (req) => {
        const fileNameWithPath = `./public/profile/${req.user.profile_pic}`;

        // delete file
        deleteFile(fileNameWithPath);
        // fs.unlink(fileNameWithPath, (error) => {
        //         console.error('Error deleting file:', error);
        // });

        const userDetails = await db.users.update({
                data: {
                        profile_pic: req.uniqueName,
                },
                where: {
                        user_id: req.user.user_id,
                },
        });

        const token = generateToken(userDetails);
        return token;
};
