import User from "../models/user.model.js";
import { encrypt, checkPassword } from "../utils/validator.js";
import { generateJwt } from "../utils/jwt.js"

export const registerUser = async(req, res) => {
  try {
      let data = req.body
      console.log(data)
      data.password = await encrypt(data.password)
      let user = new User(data)
      await user.save()
      return res.send({message: `Hello ,${user.name} your registered is completed`})    
  } catch (error) {
    console.error(error)
    return res.status(500).send({message: 'Failed to register', error: error})
    
  }
}

export const loginUser = async(req,res)=>{
  try{
      let {username, password} = req.body
      let user = await User.findOne({username})
      if (user && await checkPassword(password, user.password)){
        let loggedUser = {
          uid: user._id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      
      // Generaremos el token 
      let token = await generateJwt(loggedUser)
      return res.status(404).send({message: `Hello ${loggedUser.name}`, loggedUser, token})
      }
      if(!user) return res.status(404).send({message: 'We cant find the user, check your data'})
  }catch(error) {
    console.error(error)
      return res.status(500).send({message: 'Failed to login , check your data'})
    
  }
}

// Función para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al encontrar el ID" });
  }
};


export const updateUser = async (req, res) =>{
  try{
    let {id} = req.params
    let data = req.body
    let updateU = checkUpdate(data, false)
    if(!updateU) res.status(400).send({message: 'We cant update, check your data'})
    let updateUser = await  User.findOneAndUpdate(
      { _id: id },
      data,
      {new: true}
    )
    if (!updateUser) return res.status(401).send({message: 'We cant find the user, check your data'})
    return res.send({ message: 'We cant find the user', updateUser})
  }catch(error) {
    console.error(error)
    if(error.keyValue.username) return res.status(400).send({message: `$error.keyValue.username is already exist`})
    return res.status(500).send({message: 'We cant update the user, check your data'})
  }
}


export const deleteUser = async (req, res) =>{
  try {
    let {id} = req.params
    let deleteU = await User.findOneAndDelete({id_: id})
    if(!deleteU) return res.status(404).send({message: 'We cant delete or not found the user'})
  } catch (error) {
    console.error(error)
    return res.status(500).send({message: 'We cant delete the user, check your data'})
  }
}
