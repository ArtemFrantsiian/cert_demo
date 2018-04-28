import express from "express";
import bodyParser from "body-parser";
import https from 'https';
import fs from 'fs';
import cors from 'cors';

import { home, certificate, google2FA } from "./routes";

const corsOptions = {
  // origin: 'https://cert-generate-client.herokuapp.com',
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const servOptions = {
  requestCert: true,
  rejectUnauthorized: false,
  key: fs.readFileSync('./server_key.pem', 'utf8'),
  cert: fs.readFileSync('./server_cert.pem', 'utf8'),
};

const app = express();
const port = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", home);
app.use("/api/certificate", certificate);
app.use("/api/2fa", google2FA);

https.createServer(servOptions, app).listen(port, () => console.log(`Running on localhost:${port}`));
// app.listen(port, () => console.log(`Running on localhost:${port}`));