import Category from "../models/category.model.js";

// Función para crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    const { nameC, description } = req.body; // Usamos req.params para acceder a los datos de la URL
    const existingCategory = await Category.findOne({ nameC });
    if (existingCategory) {
      return res.status(400).send({ message: "La categoria ya existe" });
    }
    const category = new Category({ nameC, description });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Función para obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({ message: "Error al el ID" });
  }
};

// Función para actualizar una categoría por su ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameC, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { nameC, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Función para eliminar una categoría por su ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
