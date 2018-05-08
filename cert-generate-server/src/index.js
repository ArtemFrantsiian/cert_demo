import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { home, certificate, google2FA } from "./routes";

const corsOptions = {
  origin: 'https://webauth.remme.io/register',
  //origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", home);
app.use("/api/certificate", certificate);
app.use("/api/2fa", google2FA);
app.listen(port, () => console.log(`Running on localhost:${port}`));