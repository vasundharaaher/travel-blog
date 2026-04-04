import * as z from 'zod';
import fs from 'fs';

const stringfyError = (err) => {
        if (typeof err === 'object') {
                return JSON.stringify(err);
        } else if (typeof err !== 'string') {
                return err?.toString() || 'Something went wrong';
        }
        return err;
};

export default (err, req, res, next) => {
        console.log(err);

        if (err instanceof z.ZodError) {
                return res.status(400).json({
                        success: false,
                        msg: 'Invailid request object',
                        error: z.prettifyError(err),
                });
        }
        const path = './logs/error-log.txt';
        fs.appendFile(path, `\n\n ${stringfyError(err)}`, (error) => {
                if (error) {
                        console.log('Error file issue');
                }
        });

        res.status(500).json({
                success: false,
                msg: 'Something went wrong',
        });
};
