import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express"
import { decode } from "punycode";
import * as way from "../controller/roles"
import { type } from "os";
import { stringify } from "querystring";
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const userRegister = require("../controller/auth.controller")
const isverified = require("../middleware/auth.middliware");
const router = express.Router();
const prisma = new PrismaClient();
dotenv.config();


const authenticate = async (token: string): Promise<{ module: string, sub_module: string, action: string, message: string }[] | string | undefined> => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const message = "no token ";
    try {
        if (!token) {
            return message;
        }
        //console.log(token);
        const user = jwt.verify(token, jwtSecretKey);
        const id = user.userId;
        console.log(id);
        type queryres = { module: string, sub_module: string, action: string, message: string }[];
        const response: queryres = await prisma.$queryRaw`select permission.module,permission.sub_module,permission.action
        from public.user
        FULL JOIN userrole ON public.user.id = userrole.user_id
        FULL JOIN roleper ON userrole.role_id=roleper.role_id
        FULL JOIN permission ON roleper.per_id=permission.id
        where public.user.id =${id}`
        console.log(response[0].action);
        return response;
    } catch (err) {
        return message;
    }
}

export class verify {
    err: string = "error";
    response: string = "";
    message: string = "token not recieved ";
    module: string = "abc"
    sub_module: string = "hbsd"
    action: string = "nkjadbv"
    token: string | string[] | undefined = 'token value'
    constructor(gettoken: string | string[] | undefined) {
        this.token = gettoken;
    }
    async display() {
        try {
            if (!this.token) {
                return this.message;
            }
            const user = jwt.verify(this.token, process.env.JWT_SECRET_KEY);
            this.token = user.userId;
            return this.token;
        } catch (err) {
            console.log(err);
        }
    }
    async dbquery() {
        this.message = "query runned successfully";
        try {
            type queryres = { module: string, sub_module: string, action: string, message: string }[];
            const response: queryres = await prisma.$queryRaw`select permission.module,permission.sub_module,permission.action
            from public.user
            FULL JOIN userrole ON public.user.id = userrole.user_id
            FULL JOIN roleper ON userrole.role_id=roleper.role_id
            FULL JOIN permission ON roleper.per_id=permission.id
            where public.user.id =${this.token}`
            this.action = response[0].action;
            this.module = response[0].module;
            this.sub_module = response[0].sub_module;
            return this.action, this.module, this.sub_module;
        } catch (err) {
            console.log(err);
        }
    }
    async check() {
        //console.log(this.module);
        if (this.module === "master") {
            if (this.sub_module === "product") {
                this.response = "Allowed";
            } else {
                this.response = "Denied";
            }
        } else {
            this.response = "Denied";
        }
        return this.response;
    }
}

router.post("/createAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //defining neccesary variables
        let gettoken = req.headers.abd;
        //declaring an object to class
        let ver = new verify(gettoken);
        //calling class methods
        await ver.display();
        await ver.dbquery();
        const per = await ver.check();
        //console.log(ver.module, ver.sub_module, ver.action, per);
        if (per === "Allowed" && ver.action === "create") {
            res.status(200).send("Access Allowed");
        } else {
            res.send("Access not allowed").status(300);
        }
    } catch (err) {
        console.log(err)
    }
})


router.post("/viewAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //defining neccesary variables
        let gettoken = req.headers.abd;
        //declaring an object to class
        let ver = new verify(gettoken);
        //calling class methods
        await ver.display();
        await ver.dbquery();
        const per = await ver.check();
        //console.log(ver.module, ver.sub_module, ver.action, per);
        if (per === "Allowed" && ver.action === "view") {
            res.status(200).send("Access Allowed");
        } else {
            res.send("Access not allowed").status(300);
        }
    } catch (err) {
        console.log(err)
    }
})

router.post("/updateAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //defining neccesary variables
        let gettoken = req.headers.abd;
        //declaring an object to class
        let ver = new verify(gettoken);
        //calling class methods
        await ver.display();
        await ver.dbquery();
        const per = await ver.check();
        //console.log(ver.module, ver.sub_module, ver.action, per);
        if (per === "Allowed" && ver.action === "update") {
            res.status(200).send("Access Allowed");
        } else {
            res.send("Access not allowed").status(300);
        }
    } catch (err) {
        console.log(err)
    }
})

router.post("/deleteAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //defining neccesary variables
        let gettoken = req.headers.abd;
        //declaring an object to class
        let ver = new verify(gettoken);
        //calling class methods
        await ver.display();
        await ver.dbquery();
        const per = await ver.check();
        //console.log(ver.module, ver.sub_module, ver.action, per);
        if (per === "Allowed" && ver.action === "delete") {
            res.status(200).send("Access Allowed");
        } else {
            res.send("Access not allowed").status(300);
        }
    } catch (err) {
        console.log(err)
    }
})


router.get("/getAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("your are authorized user")

    } catch (err) {
        console.log(err)
    }
})
router.get("/getAPI", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("your are authorized user")

    } catch (err) {
        console.log(err)
    }
})
// WHERE permission.module = 'admin';




// (req: Request, res: Response, next: NextFunction) => {
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
// }

module.exports = router