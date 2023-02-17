import express, { Request, Response } from "express"
import { resolve } from "path/posix";
import { decode } from "querystring";
import bodyParser from "body-parser";
const authGuard = require('node-auth-guard');
const app = express();
const createRoutes = require("./routes/create")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Validation = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());
//calling routes to post data to PostGres
app.use(express.json())
dotenv.config();


//providing routes for APIs
app.use("/user", Validation);
app.use("/create", createRoutes);

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        userId: 109,
    }

    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: "1d",
    });

    res.send(token);
});

//practice for hetvi

app.get("/getdata", (req: Request, res: Response) => {
    try {
        const abc = req.query;
        console.log(abc);
        res.send("data detected");
    } catch (err) {
        console.log(err);
    }
})

const PORT = process.env.PORT || 3000;
//making server listen to port 3000
app.listen(PORT, () => {
    console.log("running at", PORT);
})
