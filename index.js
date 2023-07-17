const express = require("express");
const app = express();
const cors = require('cors');




//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));



//cargamos el archivo de rutas
app.use(require('./routes/carta'));
app.use(require('./routes/ticket'));
app.use(require('./routes/login'));


app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
});





module.exports = app;