const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getTicket = (request, response) => {
    connection.query("CALL SP_GETTICKETS()", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/ticket")
.get(getTicket);


const postTicket = (request, response) => {
    const {DATE,CATEGORY,SUPPORT,
        BRANCH,SYSTEM,DESCRIPTION,created_at} = request.body;
    connection.query("CALL SP_POSTTICKETS(?,?,?,?,?,?,?) ", 
    [DATE,CATEGORY,SUPPORT,
        BRANCH,SYSTEM,DESCRIPTION,created_at],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"TICKET añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/ticketpost")
.post(postTicket);

//--Detalle seguimiento ticket

const postTicketDet = (request, response) => {
    const {ID_TICKET, DESCRIPTION_TICKETDET,
    DATE_UPDATE_TICKETDET, ID_USER} = request.body;
    connection.query("CALL SP_POSTTICKETDET(?,?,?,?) ", 
    [ID_TICKET, DESCRIPTION_TICKETDET,
        DATE_UPDATE_TICKETDET, ID_USER],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"TICKETDET añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/ticketdet")
.post(postTicketDet);




//--Borrar un ticket

const delCarta = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from TICKET where ID_TICKET = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado filas afectadas":results.affectedRows});
    });
};

//ruta
app.route("/ticket/:id")
.delete(delCarta);


const getTicketDet = (request, response) => {
    const id = request.params.id;
    connection.query("CALL SP_GETTICKETDET(?)", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/")
.get(getTicketDet);


module.exports = app;