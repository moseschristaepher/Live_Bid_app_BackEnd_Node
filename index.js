var cors = require('cors')


const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');


const userAuthRoutes = require('./routes/auth');

const bidsDataRoutes = require('./routes/bidData');

const campaignRoutes = require('./routes/campaign');



const app = express();
const port = process.env.PORT || 8080;





app.use(bodyParser.json()); // application/json


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.use('/auth',userAuthRoutes);

app.use(bidsDataRoutes);

app.use(campaignRoutes);



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message })
})


app.listen(port, () => {
    console.log('server is up on port' + port)
})


