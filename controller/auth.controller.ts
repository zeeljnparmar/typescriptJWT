import { Request, Response, NextFunction } from "express";
module.exports.userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { userId } = req.body;
        if (!userId) {
            res.send('not found')
        } else {
            res.send(userId)
        }
    } catch (err) {
        res.send(err);
    }
}
// const responses = require("../utils/responses");
// const jwt = require("jsonwebtoken");
//const user = require("../prisma/migrations").User

// exports.token = async (req: Request, res: Response) => {
//     try {
//         const token = await jwt.sign({ id: user.user_id }, process.env.SECRET, {
//             expiresIn: "1d",
//         });

//         return responses.successResponse(
//             res,
//             { user, token },
//             "User Log in Successful."
//         );
//     } catch (err) {
//         return responses.serverErrorResponse(res, "Server Error.");
//     }
// }

// const jwt = require('express-jwt');
// const { secret } = require('config.json');

// module.exports = authorize;

// function authorize(roles = []) {
//     // roles param can be a single role string (e.g. Role.User or 'User')
//     // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
//     if (typeof roles === 'string') {
//         roles = [roles];
//     }

//     return [
//         // authenticate JWT token and attach user to request object (req.user)
//         jwt({ secret, algorithms: ['HS256'] }),

//         // authorize based on user role
//         (req: Request, res: Response, next: NextFunction) => {
//             if (roles.length && !roles.includes(req.user.role)) {
//                 // user's role is not authorized
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }

//             // authentication and authorization successful
//             next();
//         }
//     ];
// }