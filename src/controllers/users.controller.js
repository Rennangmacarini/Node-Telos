const uuid = require("uuid")

const { generateHash } = require("../utils/hashProvider")

const users = [
  {
    
      id: "bd9be29d-2953-4b21-830a-4bea7009ea49",
      name: "Rennan",
      email: "rennangmacarini@gmail.com",
      password: "$2a$08$gCmrOx3Na5TQtCWsy5SOS.AlS7yP.2X3AQLC6XfIdCEEjffAcZHHe",
      age: 25,
      createdAt: new Date(),
      update: new Date(),

    
  }
];

const list = (request, response) => {
 return response.json(users)
}

const getById = (request, response) => {
  const {id} = request.params;
  const user = users.find((u) => u.id === id)

  if(!user){
    return response.status(400).json({
      error: "@users/getById",
      message: `User not found ${id}`
    })
  }

  return response.json(user);
}

const create = async (request, response) => {
  const { name, email, password, age} = request.body

  const id = uuid.v4()

  const hashedPassword = await generateHash(password)

  const user = {
    id,
    name,
    email,
    password: hashedPassword,
    age,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(user)


  return response.status(201).json(user);
}

const update = async (request, response) => {
 const { id } = request.params;
 const {name, email, password, age} = request.body;

 const userIndex = users.findIndex((u) => u.id === id);

 if(userIndex < 0){
  return response.json({
    error: "@users/update",
    message: `User not found ${id}`
  })
 }

 const { createdAt } = users[userIndex]

 const userUpdate = {
  id,
  name,
  email,
  age,
  createdAt,
  updatedAt: new Date(),
 };

 if(password){
  userUpdate.password = await generateHash(password)
 }else{
  userUpdate.password = users[userIndex].password
 }

 users[userIndex] = userUpdate;

 return response.json(userUpdate)
}

const remove = (request, response) => {
  const { id } = request.params;
  
  const userIndex = users.findIndex((u) => u.id === Number(id))

    if(userIndex < 0){
      return response.status(400).json({
        error: "@users/remove",
        message: `User not found ${id}`
      })
    }

    users.splice(userIndex, 1);
    return response.send();
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  userDatabase: users,
}