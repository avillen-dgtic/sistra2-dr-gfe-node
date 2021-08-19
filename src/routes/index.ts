/**
 * index
 * Copyright(c) 2021 Alejandro Villén
 * MIT Licensed
 */

import express from "express";
const api = express.Router();

// import public-routers
import publicController from "./public";
api.use("/", publicController);

export = api;
