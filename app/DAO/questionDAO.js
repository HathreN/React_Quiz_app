import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const questionSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    questionsDetails: {type: Array, required: true, unique: true},
}, {
    collection: 'question'
});

questionSchema.plugin(uniqueValidator);

const questionDAO = mongoose.model('question', questionSchema);

module.exports = questionDAO;

export default {
    model: questionDAO,

};
