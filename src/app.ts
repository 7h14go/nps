import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import createConnection from './database' /**como tenho um arquivo index dentro da pasta database, não é necessário especificar o arquivo pois por padão é importado o arquivo index*/
import { router } from './routes'
import { AppError } from './errors/AppError'

createConnection()
const app = express()

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => deletar
 * PATCH => Alteração específica
 */

 //Informa que vai trabalhor com Json
 app.use(express.json())

 app.use(router)

 app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
     if(err instanceof AppError){
         return response.status(err.statusCode).json({
             message: err.message
         })
     }

     return response.status(500).json({
         status: "Error",
         message: `Internal server error ${err.message}`
     })
 })

 
 export{ app }