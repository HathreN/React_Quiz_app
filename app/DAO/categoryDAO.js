import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const categorySchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: false},
    name: {type: String, required: true, unique: false},
}, {
    collection: 'question'
});

categorySchema.plugin(uniqueValidator);

const CategoryDAO = mongoose.model('category', categorySchema);

module.exports = CategoryDAO;

export default {
    model: CategoryDAO,
};
