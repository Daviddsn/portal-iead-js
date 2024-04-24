import https from 'node:https'
import express from 'express';
import nunjucks from 'nunjucks';
import { routes } from "./router.js";
import fs from 'node:fs'

import {menuData} from './src/shared.js';


 var privateKey = fs.readFileSync('certificados/localhost.key', 'utf8');

var certificate = fs.readFileSync('certificados/server.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };
const server = express()

const env  = nunjucks.configure('src/views', {
    express: server,
    autoescape: true,
    noCache: true,
})

env.addGlobal('menuData', menuData)



// Inicio e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("./public"))

.use(routes);


const porta = process.env.PORT_APP || 4000



server.listen(porta, () => console.log( "Servidor Rodando na porta " + porta))


// https.createServer(credentials , server).listen(porta, () => console.log( "Servidor Rodando na porta " + porta))



