require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./databases/config');

const app = express();

app.use(cors())

app.use(express.json());

dbConnection();

app.use(express.static('public'));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo/', require('./routes/busquedas'));
app.use('/api/upload/', require('./routes/uploads'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});