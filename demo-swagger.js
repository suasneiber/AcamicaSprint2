const express = require('express');
const app = express();
const port = 3016;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const students = require('./students');

//setup swagger UI
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Acamica API',
      version: '1.0.0'
    }
  },
  apis: ['./students.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


//rutas
app.use('/students', students);

app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port} !`);
});
