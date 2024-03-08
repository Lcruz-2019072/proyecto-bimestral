'use strict'

import User from '../models/user.model.js'
import { encrypt, checkPassword, checkUpdate} from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'



export const defaultUser = async (name, surname, username, password, phone, email, role) =>{
  try {
    let adminRole = await User.findOne({role: 'ADMIN'})   
    
    if(!adminRole){
      let data ={
        name: name,
        surname: surname,
        username: username,
        password: await encrypt(password),
        phone: phone,
        email: email,
        role: 'ADMIN'
      }
      let user = new User(data)
      await user.save()
      return console.log('Este usuario fue creado')
    } else{
      return console.log('The user ADMIN is now avaible')
    }
  } catch (error) {
    console.error(error)
  }
}

defaultUser('aurora','zamora','auroritus','12345','12345678','auroritus@gmail')


export const registerUser = async(req, res) =>{
    try { 
        let data = req.body
        console.log(data)
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: `El registro de ${user.username} fue completado`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al agregar el usuario', error: error})
    }
}

export const loginUser = async (req, res)=>{
    try {
        let {username, password} = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                name:  user.name,
                username: user.username,
                email: user.email,
                role: user.role 
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Bienvenido ${loggedUser.username}`, loggedUser, token})
        }
        if(!user) return res.status(404).send({message: 'El usuario no fue encontrado'})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al iniciar sesion'})
        
    }
}

export const updateUser = async (req, res) =>{
    try {
        let {id} = req.params 
        let data = req.body 
        let update =  checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Revisa tus datos , no se completo la actualizacion de datos'})
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        )
        return res.send({ message: 'user update', updateUser })

    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({ message: 'Error al actualizacion'})
    }
}

export const deleteUser = async(req, res) =>{
    try {
        let {id} = req.params
        let deletedAccount = await User.findOneAndDelete({_id: id})
        if(!deletedAccount) return res.status(404).send({message: 'No se encontro el Usuario y no se elimino'})
        return res.send({message: `${deletedAccount.username} se borro tu Usuario`}) 
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error, no se elimino el Usuario'})
        
    }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};


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

