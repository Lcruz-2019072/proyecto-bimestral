import User from "../models/user.model.js";

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = new User({ username, password, email, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email, username });

    const allUser = await User.find({ username });
    const userExists = allUser.some((user) => {
      return user.email == email && user.username == user.username;
    });

    if (userExists) {
      return res.status(400).json({ message: "ASDKLASDNKSADLKASDKLH" });
    }

    if (email && username) {
      return res
        .status(404)
        .json({ message: "Solo puedes iniciar sesion con Username o Email " });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Función para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al encontrar el ID" });
  }
};

// Función para actualizar un usuario por su ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, email, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Función para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
