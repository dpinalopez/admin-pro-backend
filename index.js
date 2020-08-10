require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./databases/config');

const app = express();

app.use(cors())

dbConnection();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + 3000);
});