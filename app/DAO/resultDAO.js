import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    category: {type: String, required: true, unique: false},
    score: {type: Number, required: true, unique: false}
}, {
    collection: 'results'
});

categorySchema.plugin(uniqueValidator);

const ResultDAO = mongoose.model('results', categorySchema);

module.exports = ResultDAO;

export default {
    model: ResultDAO,
};
