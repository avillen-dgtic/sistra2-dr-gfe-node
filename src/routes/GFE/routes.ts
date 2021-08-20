
/**
 * gfe
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import * as express from "express";
// Database instance
import { Pool } from "pg";

const config = {
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	password: process.env.POSTGRES_PASS,
	database: process.env.POSTGRES_DATABASE,
};
const pool = new Pool(config);
const api = express.Router();

/**
 * Public routes
 */

/**
 * GFE - Gestors de formularis externs
 */

api.post("/gfe", async function (req: express.Request, res) {
	const request: express.Request = req;
	// console.log(request);
	return res.status(200).send("Page GFE");
});

export = api;
