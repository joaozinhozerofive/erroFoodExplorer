const knex  = require('../database/knex/index')
const {compare} = require("bcryptjs")
const {sign} = require("jsonwebtoken");
const AppError = require('../utils/AppError');
const auth = require('../configs/auth');


class AdminSessions{

    async create(request, response){

        const { email, password, table} = request.body;

        const user = await knex("users").where({email}).first();

        if(!user){
            throw new AppError("Usuário e/ou senha incorretos.", 401)
        }
        
        
        const notAdmin = user.admin != 0;

        if(notAdmin){
            throw new AppError ("Para iniciar sessão como usuário comum, você deve estar na aba de correta")
        }
        

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Usuário e/ou senha incorretos.", 401)
        }


        const {secret, expiresIn } = auth.jwt;

        const token = sign({table}, secret, {
            subject: String(user.id), 
            expiresIn
        })


        response.json({user, token});


    }

}


module.exports = AdminSessions;