const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getCarta = (request, response) => {
    connection.query("SELECT * FROM USER", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/user")
.get(getCarta);


const postCarta = (request, response) => {
    const {name, nickname, password} = request.body;
    connection.query("INSERT INTO USER(NAME_USER, NICKNAME_USER, PASSWORD_USER) VALUES (?,?,?) ", 
    [name, nickname, password],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/user")
.post(postCarta);


const delCarta = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from USER where ID_USER = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/user/:id")
.delete(delCarta);

//hacemos peticion con tiempo para evitar se cierre conexion con el servidor 

setInterval(function () {
    connection.query('SELECT 1');
    console.log("Conectado...");
}, 10000);

module.exports = app;