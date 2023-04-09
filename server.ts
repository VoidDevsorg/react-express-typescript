import Express from 'express';
import axios from 'axios';

const app = Express();
const port = 8080;

app.use(require('cors')({ origin: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ipinfo/:ip', async (req, res) => {
    const ip = req.params.ip as string;
    const resp = await axios.get('https://json.geoiplookup.io/' + ip).then((response) => response.data).catch((error: Error) => false);
    if (!resp) return res.send({ error: 'Invalid IP' });

    res.send(resp);
});


app.listen(port, () => {
    console.log(`Example chat-app listening at http://localhost:${port}`);
});