"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeAddress = undefined;

var _dotenv = require("dotenv");

(0, _dotenv.config)();

var nodeAddress = exports.nodeAddress = process.env.NODE_ADDRESS || "46.101.106.43";