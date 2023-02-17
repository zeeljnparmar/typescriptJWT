import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

// // const authentication = (req: Request, res: Response, next: NextFunction) => {
// //     const token = req.headers.token;
// //     if (token) {

// //     } else {

// //     }
// // }

// //const response = require("../utils/responses");
// module.exports.isverified = (req: Request, res: Response, next: NextFunction) => {
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;

//     try {
//         let token = req.headers.abd;
//         if (!token) {
//             return res.send("No Token.");
//         }
//         console.log(token);
//         const user = jwt.verify(token, jwtSecretKey,
//             (err: Error, decode: String) => {
//                 if (err) {
//                     return res.send("User is not verified.",);
//                 } else {
//                     return res.send(decode);
//                 }
//             }
//         );
//         console.log(user.user_id);
//         next();
//     } catch (error) {
//         return res.send("Server Error.");
//     }
// };


export class verify {
    err: string = "error";
    message: string = "token not recieved ";
    module: string = "abc"
    sub_module: string = "hbsd"
    action: string = "nkjadbv"
    token: string = 'token value'
    constructor(gettoken: string) {
        this.token = gettoken;
    }
    display() {
        try {
            if (!this.token) {
                return this.message;
            }
            console.log(this.token);
            const user = jwt.verify(this.token, process.env.jwtSecretKey,
                (err: Error, decode: String) => {
                    if (err) {
                        return this.err;
                    } else {
                        return user;
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }
}