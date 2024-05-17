const express = require('express');
const cors = require('cors');
const { main1 } = require('./charts/mainDashboardCharts/main1');
const { main2 } = require('./charts/mainDashboardCharts/main2');
const { main3 } = require('./charts/mainDashboardCharts/main3');
const { marks1 } = require('./charts/marksCharts/marks1');
const { marks2 } = require('./charts/marksCharts/marks2');
const { marks3 } = require('./charts/marksCharts/marks3');
const { marks4 } = require('./charts/marksCharts/marks4');
const { marks5 } = require('./charts/marksCharts/marks5');
const { marks6 } = require('./charts/marksCharts/marks6');


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

app.post('/marks1', (req, res) => marks1(req, res));
app.post('/marks2', (req, res) => marks2(req, res));
app.post('/marks3', (req, res) => marks3(req, res));
app.post('/marks4', (req, res) => marks4(req, res));
app.post('/marks5', (req, res) => marks5(req, res));
app.post('/marks6', (req, res) => marks6(req, res));


app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});