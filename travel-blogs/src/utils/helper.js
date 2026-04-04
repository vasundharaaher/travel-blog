import jwt from 'jsonwebtoken';
import fs from 'fs';

export const generateToken = (userDetails) => {
        delete userDetails.password;
        const token = jwt.sign(userDetails, process.env.JWT_SECRET);
        return token;
};

export const deleteFile = (fileNameWithPath) => {
        if (fileNameWithPath && fs.existsSync(fileNameWithPath)) {
                fs.unlink(fileNameWithPath, (error) => {
                        if (error) {
                                console.log('failed to delete file = ', error);
                        }
                });
        }
};
