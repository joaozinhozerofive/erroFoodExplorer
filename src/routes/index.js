const {Router} =  require("express");

const userRoutes = require("./users.routes");
const sessionRoutes = require("./Sessions.routes");
const adminRoutes = require("./AdminsSessions.routes");
const platesRoutes = require("./Plates.routes");

const routes = Router();



routes.use("/users",  userRoutes);
routes.use("/sessions",  sessionRoutes);
routes.use("/sessionsAdmin",  adminRoutes);
routes.use("/plates", platesRoutes);


module.exports = routes;
