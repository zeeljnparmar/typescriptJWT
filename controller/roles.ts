module.exports = {
    Admin: 'Admin',
    User: 'User'
}
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
dotenv.config();

const validation = async (req: Request, res: Response, next: NextFunction) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        let token = req.headers.abd;
        if (!token) {
            return res.send("No Token.");
        }
        //console.log(token);
        const user = jwt.verify(token, jwtSecretKey);
        const id = user.userId;
        console.log(id);
        //res.send("success");
        type queryres = { module: string }[];
        const response: queryres = await prisma.$queryRaw`select permission.module
        from public.user
        FULL JOIN userrole ON public.user.id = userrole.user_id
        FULL JOIN roleper ON userrole.role_id=roleper.role_id
        FULL JOIN permission ON roleper.per_id=permission.id
        where public.user.id =${id}`
        const role = response[0].module;
        if (role === 'admin') {
            next();
        }
    } catch (err) {
        console.log(err)
    }
}

export { validation }