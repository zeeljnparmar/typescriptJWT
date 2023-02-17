import { verify } from "../middleware/auth.middliware"
import express, { Request, Response, NextFunction } from "express"


const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();


