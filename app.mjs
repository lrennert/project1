import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import {noteRouter} from './routes/note-router';

// workaround for __dirname not available with --experimental-modules
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use("/", noteRouter);

export default app;
