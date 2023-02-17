import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req: Request, res: Response) => {
    console.log(JSON.stringify(req.headers.abd));
    res.send("recieved")
})
router.post("/use", async (req: Request, res: Response) => {
    const user = await prisma.user.createMany({
        data: [{
            id: 101,
            name: "zeel"
        }, {
            id: 102,
            name: "parmar"
        }]
    })
    res.send(user);
    const role = await prisma.role.createMany({
        data: [{
            id: 201,
            name: "create"
        }, {
            id: 202,
            name: "read"
        }]
    })
    res.send(role);
    // const permission = await prisma.permission.createMany({
    //     data: [{
    //         id: 301,
    //         module: "admin",
    //         sub_module: "role"
    //     }, {
    //         id: 302,
    //         module: "user",
    //         sub_module: "role"
    //     }]
    // })
    // res.send(permission);
})

router.post("/role", async (req: Request, res: Response) => {
    const role = await prisma.role.createMany({
        data: [{
            id: 201,
            name: "create"
        }, {
            id: 202,
            name: "read"
        }]
    })
    res.send(role);
})

// router.post("/per", async (req: Request, res: Response) => {
//     const permission = await prisma.permission.createMany({
//         data: [{
//             id: 301,
//             module: "admin",
//             sub_module: "role"
//         }, {
//             id: 302,
//             module: "user",
//             sub_module: "role"
//         }]
//     })
//     res.send(permission);
// })

router.post("/userole", async (req: Request, res: Response) => {
    const userrole = await prisma.userrole.createMany({
        data: [
            {
                userole_id: 401,
                user_id: 101,
                role_id: 201
            }, {
                userole_id: 402,
                user_id: 102,
                role_id: 202
            }
        ]
    })
    res.send(userrole);
})
router.post("/roleper", async (req: Request, res: Response) => {
    const roleper = await prisma.roleper.createMany({
        data: [{
            roleper_id: 501,
            role_id: 201,
            per_id: 301
        },
        {
            roleper_id: 502,
            role_id: 202,
            per_id: 302
        }]
    })
    res.send(roleper);
})


module.exports = router