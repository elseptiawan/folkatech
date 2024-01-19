require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log("Database Connected");
});

const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.use('/', indexRoute);
apiRoutes.use('/users', userRoute);

app.listen(process.env.PORT, () => {
    console.log("Server Run at Port", process.env.PORT);
});