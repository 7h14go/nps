import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import * as yup from "yup"
import { AppError } from "../errors/AppError"

class UserController{
    async create(request: Request, response: Response){
        
        const {name, email} = request.body

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("Email incorreto")
        })

        try{
            await schema.validate(request.body, {abortEarly: false})
        } catch (err){
            throw new AppError(err) 
        }
        
        const usersRespository = getCustomRepository(UsersRepository)                

        const userAlreadyExists = await usersRespository.findOne({email})

        if(userAlreadyExists){
            throw new AppError("User already exists!") 
        }

        const user = usersRespository.create({
            name, email
        })
        
        await usersRespository.save(user)

        return response.status(201).json(user)
    }
}

export { UserController }
