import multer from 'multer';
import { numberSchema } from '#validation/common.validation';

const myStorage = multer.diskStorage({
        destination: (req, file, cd) => {
                let destinationfolder = './public/profile';
                if (file.fieldname === 'pictures') {
                        // for blog images
                        const result = numberSchema.safeParse(
                                req.params.blog_id
                        );
                        if (result.error) {
                                cd(
                                        new Error(
                                                'Somthing went wrong with blog id'
                                        ),
                                        null
                                );
                        }
                        req.blog_id = result.data;
                        destinationfolder = './public/images';
                }
                cd(null, destinationfolder);
        },
        filename: (req, file, cd) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                if (req.uniqueName) {
                        req.uniqueName += ', ' + uniqueName;
                } else {
                        req.uniqueName = uniqueName;
                }

                cd(null, uniqueName);
        },
});

const multerInstance = multer({ storage: myStorage });
export default multerInstance;
