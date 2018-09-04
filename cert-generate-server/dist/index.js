"use strict";

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require("dotenv");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var corsOptions = {
  origin: '*',
  methods: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
(0, _dotenv.config)();
var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

app.use((0, _cors2.default)(corsOptions));
app.use(_bodyParser2.default.json());

app.use("/api/home", _routes.home);
app.use("/api/register", _routes.register);
app.use("/api/certificate", _routes.certificate);
app.use("/api/2fa", _routes.google2FA);
app.listen(port, function () {
  return console.log("Running on localhost:" + port);
});