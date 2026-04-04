import { updateProfile, updateProfilePic } from '#services/user.service';

export const updateUserHandler = async (req, res) => {
        const response = await updateProfile(req);
        res.status(200).json({
                msg: 'profile  update successfully',
                success: true,
                refreshToken: response,
        });
};

export const updateUserProfilePicHandler = async (req, res) => {
        const response = await updateProfilePic(req);
        res.status(200).json({
                msg: 'profile pic update successfully',
                success: true,
                refreshToken: response,
        });
};
