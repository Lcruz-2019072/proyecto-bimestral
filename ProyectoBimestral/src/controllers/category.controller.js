import Category  from '../models/category.model.js';

// Función para crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.params; // Usamos req.params para acceder a los datos de la URL
        const category = new Category({ name, description });
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Función para obtener todas las categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar una categoría por su ID
export const updateCategory = async (req, res) => {
    try {
        // Verificar si el usuario que hace la solicitud es un ADMIN
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: "Unauthorized: Only ADMIN can update categories." });
        }

        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para eliminar una categoría por su ID
export const deleteCategory = async (req, res) => {
    try {
        // Verificar si el usuario que hace la solicitud es un ADMIN
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: "Unauthorized: Only ADMIN can delete categories." });
        }

        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
