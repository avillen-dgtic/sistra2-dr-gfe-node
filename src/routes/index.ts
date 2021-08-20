/**
 * index
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

import express from "express";
const api = express.Router();

// import dr-routes
import drController from "./DR/routes";
api.use("/dr/", drController);

// import gfe-routes
import gfeController from "./GFE/routes";
api.use("/gfe/", gfeController);

export = api;
