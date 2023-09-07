const {Router} = require("express")
const platesRoutes = Router();

const PlatesController = require("../Controllers/PlatesController")
const platesController = new PlatesController(); 


platesRoutes.post("/:user_id", platesController.create);
platesRoutes.get("/:plate_id", platesController.show);
platesRoutes.get("/", platesController.index);
platesRoutes.delete("/:plate_id", platesController.delete);
platesRoutes.put("/:plate_id", platesController.update);


module.exports = platesRoutes;