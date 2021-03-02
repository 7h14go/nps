import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/**
 * Route Params => Parametros que compõe a rota
 * routes.get("answers/:value/:u")
 * 
 * Query Params => Busca, paginação, não obritórios
 * sempre vem depois do ?
 * a composição é chave = valor
 */

class AnswerController{
    async execute(request: Request, response: Response){
        const {value} = request.params;
        const {u} = request.query;

        const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u)
        })

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")            
        }

        surveyUser.value = Number(value)

        await surveyUserRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}

export{ AnswerController }