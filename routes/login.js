
const express = require("express");
const app = express();


const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");



const postLogin = (request, response) => {
    const {username, password} = request.body;
    connection.query("SELECT * FROM USER WHERE NICKNAME_USER = ? AND PASSWORD_USER = ?  ", 
    [username, password],
    (err, result) => {
        if (err){
            response.send({err: err})
        } 

        if (result.length > 0){
            response.send(result);
        } else {
            response.send({message: "wrong user or password"})
        }
     }
    
    );
};

//ruta
app.route("/login")
.post(postLogin);


module.exports = app;