const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../config/env")

const { userDatabase } = require("./users.controller")

const { compareHash } = require("../utils/hashProvider")

const login = async (request, response) => {
   const { email, password } = request.body;

   const user = userDatabase.find(u => u.email === email)

   const loginErrorMessage = {
    error: "@authenticate/login",
    message: "Invalid email or password",
   }

   if(!user){
    return response.status(400).json(loginErrorMessage);
   }

   const isValidPassword = await compareHash(password, user.password)

   if(!isValidPassword){
      return response.status(400).json(loginErrorMessage);
   } 

   const userLoged = {...user}

   const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1h",
   })

   delete userLoged.password;

   return response.json({ ...userLoged, token })
}

module.exports = {
  login,
};