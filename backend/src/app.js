import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser);

app.get('/', (req, res) => res.send("hello"));

export default app