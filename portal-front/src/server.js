import https from 'node:https'
import express from 'express';
import nunjucks from 'nunjucks';
import { routes } from "./router.js";
import fs from 'node:fs'

import path from 'node:path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const __dirname = path.resolve();

import { menuData } from './shared.js';



const server = express()

const env = nunjucks.configure(path.join(__dirname,'/src/views/'), {
    express: server,
    autoescape: true,
    noCache: true,
})

env.addGlobal('menuData', menuData)

// server.set('view engine', 'html')



// Inicio e configuração do servidor
server
    // receber os dados do req.body
    .use(express.urlencoded({ extended: true }))
    // configurar arquivos estáticos (css, scripts, imagens)
    .use(express.static(path.join(__dirname,'/public')))

   

    .use(routes);


const porta = process.env.PORT_APP || 4000

console.log(path.join(__dirname,'/public'))

server.listen(porta, () => console.log("Servidor Rodando na porta " + porta))


// https.createServer(credentials , server).listen(porta, () => console.log( "Servidor Rodando na porta " + porta))



