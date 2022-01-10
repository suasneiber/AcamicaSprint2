require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3028
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const usuarios = require('./routes/usuarios')
const productos = require('./routes/productos')
const pedidos = require('./routes/pedidos')
const pagos = require('./routes/pagos')




const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'API de restaurante',
          version: '1.0.0'
        }
      },
      apis: ['./routes/usuarios.js','./routes/productos.js', './routes/pedidos.js','./routes/pagos.js']
    };
    
const swaggerDocs = swaggerJsDoc(swaggerOptions);
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
//RUTAS

app.use('/usuarios', usuarios);
app.use('/productos', productos)
app.use('/pedidos', pedidos)
app.use('/pagos', pagos)


app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs));

  
app.listen(PORT)
console.log(`escuchando en el puerto http://localhost:${PORT}`);
