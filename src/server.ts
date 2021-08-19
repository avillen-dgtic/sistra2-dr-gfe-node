/**
 * server
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

import express from "express";
import cookieParser from "cookie-parser";

/**
 * Routes (route handlers).
 */
import Routes from "./routes/index";

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration
 */

app.use(cookieParser());
app.use("/", Routes);


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use((req, res, next) => {
	const request: express.Request = req;
	console.log(request);
	res.status(404);
	res.send("Codi 404. La ruta no existeix.");
});

/**
 * Start Express server.
 */


app.set("port", 3000);
app.listen(app.get("port"), () => {
	console.log(("  Server is running up at http://localhost:%d"), app.get("port"));
});



