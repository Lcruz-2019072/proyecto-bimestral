
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    nameC: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;



