const knex = require("../database/knex/index")


class PlatesController {
    async create(request, response){
        const {name, category, ingredients, price, description} = request.body;
        const {user_id} = request.params


        const [plate_id] = await knex("plates").insert({
            name, 
            category, 
            price,
            description, 
            user_id
        })


        const ingredientsInsert = ingredients.map( name => {
            return{
                name, 
                plate_id,
                user_id
            }
        }
        )

        await knex("tags").insert(ingredientsInsert);



       return response.json({plate_id, name, category, ingredients, price, description, user_id});

    }

    async update(request, response){
        let {name, category, ingredients, price, description} = request.body;
        const {plate_id} = request.params;
        
        const plates = await knex("plates").where({plate_id})
        const tags = await knex("tags").where("plate_id", plate_id)

        
            
        

        if(plates.name){plates.name = plates.name}

        if(plates.category){plates.category = plates.category}

        if(plates.price){plates.price = plates.price }

        if(plates.description){plates.description = plates.description}

        if(tags.name){tags.name = tags.name}

        if(!ingredients){ ingredients = tags.name}
        


        const updatedPlates = {
            name, 
            category, 
            price, 
            description
        }
        
        await knex("plates")
        .update(updatedPlates)
        .where({plate_id})

        const [ingredientsUpdated] = ingredients.map(ingredient =>ingredient)
        

        await knex("tags")
        .where("plate_id", plate_id). 
        update({name : ingredientsUpdated})

        



        

        

        return response.status(200).json(ingredients)


    }


    async show(request, response){
        const {plate_id} = request.params;

        const plate = await knex("plates").where({plate_id});
        const tag = await knex("tags").where({plate_id});

        return response.json({
            plate,
            tag
        })
    }



    async index(request, response){
        const {name, ingredients} = request.query;

        let plates;


        
        if(ingredients){
            plates = await knex("tags").select(
                "plates.plate_id",
                "plates.name",
                "plates.category", 
                "plates.price",
                "plates.description", 
                "plates.user_id",
                )
                .whereLike("tags.name", `%${ingredients}%`)
                .innerJoin("plates", "plates.plate_id", "tags.plate_id")
                .groupBy("plates.name")
                
            }else{
                plates = await knex("plates").select([
                    "plate_id", 
                    "name",
                    "category", 
                    "price",
                    "description", 
                    "user_id"
                ])
                .whereLike("name", `%${name}%`)
                .orderBy("name")
            }
            
            
            const tags = await knex("tags")
            .select(
                 "name",
                 "plate_id", 
             )


    const platesWithIngredients = plates.map(plate =>{
        const plateTags = tags.filter(tag => tag.plate_id === plate.plate_id)

        return {
            ...plate,
            plateTags
        };
    }
        
        )
        
    
    
    return response.json(platesWithIngredients);
}
    
   




    async delete(request, response){
        const {plate_id} = request.params;


        await knex("plates").where({plate_id}).delete();

        return response.json(plate_id);
    }
}

module.exports = PlatesController;
