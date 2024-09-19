const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
    nomeAluno: { type: String, required: true },
    resumoAula: { type: String, required: true },
    fotoAula: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Presenca', PresencaSchema);
