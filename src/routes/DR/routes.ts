
/**
 * dr
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import * as express from "express";
import { drDomain } from "./DRDomain";

const api = express.Router();

/**
 * Public routes
 */

/**
 * DR - Dominis remots
 */
api.post("/search", async function (req: express.Request, res) {

	try {
		const query = "SELECT * FROM pbe_procediment";
		const params = drDomain.parseParams(req.body);
		return res.json(await drDomain.query(`${query} ${params}`));
	} catch (e) {
		console.error(e);
		return res.json(drDomain.empty());
	}

});


export = api;
