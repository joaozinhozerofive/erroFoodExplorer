const {Router} = require("express")
const adminRoutes = Router(); 


const AdminSessions = require("../Controllers/AdminSessions")
const adminSessions = new AdminSessions();








adminRoutes.post("/", adminSessions.create)


module.exports = adminRoutes;