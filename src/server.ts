/**
 * server
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */


// Environment variables
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import session from "express-session";
import path from "path";

/**
 * Routes (route handlers).
 */
import Routes from "./routes/index";

/**
 * Create Express server.
 */
const app = express();
/**
 * Engine
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(session({
	name: "sistra2SessionExpress",
	proxy: true,
	resave: true,
	saveUninitialized: true,
	secret: "randomrandomrandomcookies"
	// store: sessionStore, // connect-mongo session store
}));


app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

/**
 * Express configuration
 */
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



