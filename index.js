const express = require('express');
const cors = require('cors');
const { main1 } = require('./charts/mainDashboardCharts/main1');
const { main2 } = require('./charts/mainDashboardCharts/main2');
const { main3 } = require('./charts/mainDashboardCharts/main3');


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
app.post('/main2', (req, res) => main2(req, res));
app.post('/main3', (req, res) => main3(req, res));



app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});