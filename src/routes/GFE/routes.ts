/**
 * gfe
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import * as express from "express";
import NodeCache from "node-cache";
import { jsPDF } from "jspdf";
import { nodeModuleNameResolver } from "typescript";


const cache = new NodeCache({ stdTTL: 0 });


const api = express.Router();

/**
 * Public routes
 */

/**
 * GFE - Gestors de formularis externs
 */
api.get("/resultado/:id", async function (req: express.Request, res) {
	const idSesion = req.params.id.split(":")[0];
	console.log(idSesion);

	const dataRecovered: any = cache.get(idSesion);
	console.log(dataRecovered);

	// Convert XML to Base64
	const xmlBase64 = Buffer.from(dataRecovered.xml, "utf-8").toString("base64");

	// Convert JSON to PDF and then to Base64
	const doc = new jsPDF();
	let yPosition = 20;
	for (const key in Object.keys(dataRecovered.json)) {
		const jKey = Object.keys(dataRecovered.json)[key];
		const jValue = dataRecovered.json[Object.keys(dataRecovered.json)[key]];
		doc.text(`Camp ${jKey} = ${jValue}`, 20, yPosition);
		yPosition = yPosition + 20;
	}
	doc.text(`Aquest document s'ha creat amb data: ${new Date().toLocaleString().toString()}`, 20, yPosition);
	doc.save("document.pdf");
	const pdfBase64 = Buffer.from(doc.output()).toString("base64");

	// Delete cache data, like OTP ticket
	cache.del(idSesion);

	return res.send({
		idSesionFormulario: idSesion,
		cancelado: false,
		xml: xmlBase64,
		pdf: pdfBase64
	});
});

api.post("/resultado/:id", async function (req: express.Request, res) {
	const idSesion = req.params.id;
	console.log(idSesion);
	console.log(req.body);

	cache.set(idSesion, Object.assign({}, req.body));

	const url = "https://dev.caib.es/sistramitfront/asistente/retornoGestorFormularioExterno.html?ticket=";
	return res.send({ url: `${url}${idSesion}:${new Date().getTime()}` });
});


api.get("/rellenar/:IdSesion", async function (req: express.Request, res) {
	console.log("Page GFE - Formulario GET");
	const idSesion = req.params.IdSesion;
	console.log(idSesion);
	console.log(cache.get(idSesion));
	const cacheData: any = cache.get(idSesion);
	const xmlDatosActuales = cacheData.xmlDatosActuales;

	console.log(Buffer.from(xmlDatosActuales, "base64").toString());
	const xml2js = require("xml2js");
	// convert XML to JSON
	xml2js.parseString(Buffer.from(xmlDatosActuales, "base64").toString(), (err: any, result: any) => {
		if (err) {
			throw err;
		}

		const element: any = Object.keys(result)[0];
		const nom = result[element].nom || "";
		const cognoms = result[element].cognoms || "";
		const data = result[element].data || "";
		const comentari = result[element].comentari || "";

		return res.render("GFE/base", {
			sesion: idSesion,
			nom: nom,
			cognoms: cognoms,
			data,
			comentari
		});
	});

});

api.post("/formulario", async function (req: express.Request, res) {
	const request: express.Request = req;
	console.log("Page GFE - Formulario POST");
	cache.set(req.body.idSesionFormulario, Object.assign({}, req.body));
	console.log(req.body);
	console.log(req.body.idSesionFormulario);

	return res.status(200).send(`http://epreinf147:3000/gfe/rellenar/${req.body.idSesionFormulario}`);
});

export = api;
