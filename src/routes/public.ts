
/**
 * public
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import * as express from "express";
const api = express.Router();

/**
 * Public routes
 */

/**
 * DR - Dominis remots
 */
api.get("/dr", async function (req: express.Request, res) {
	return res.status(200).send("Dominis Remots a Node.js");
});
api.post("/dr", async function (req: express.Request, res) {
	const request: express.Request = req;
	const result: any = {
		error: false,
		codiError: undefined,
		descripcionError: undefined,
		codigoRetorno: undefined,
		datos: [
			{ id: "1", name: "Nom1"},
			{ id: "2", name: "Nom2" },
			{ id: "3", name: "Nom3" },
			{ id: "4", name: "Nom4" },
			{ id: "5", name: "Nom5" },
		]
	};
	return res.json(result);
});


/**
 * GFE - Gestors de formularis externs
 */
api.get("/gfe", async function (req: express.Request, res) {
	return res.status(200).send("Gestors de formularis externs a Node.js");
});
api.post("/gfe", async function (req: express.Request, res) {
	const request: express.Request = req;
	// console.log(request);
	return res.status(200).send("Page GFE");
});

export = api;
