import { login, register } from '#services/auth.service';

export const loginHandler = async (req, res) => {
        const token = await login(req);
        if (token) {
                return res.status(200).json({
                        msg: 'login success',
                        success: true,
                        token,
                });
        }
        return res.status(401).json({ msg: 'Unaouthorized', success: false });
};

export const registerHandler = async (req, res) => {
        const response = await register(req);
        res.status(200).json({
                msg: 'register success',
                success: true,
                response,
        });
};
