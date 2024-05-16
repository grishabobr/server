const express = require('express');
const cors = require('cors');
const { main1 } = require('./charts/mainDashboardCharts/main1');


const app = express();

let corsOptions = {
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOptions))
app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        message: 'Hello WWW!'
    });
});

app.post('/main1', (req, res) => main1(req, res));



app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});