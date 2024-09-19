const Presenca = require('../models/Presenca');

exports.getAllPresencas = async (req, res) => {
    try {
        const Presencas = await Presenca.find();
        res.json(Presencas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPresenca = async (req, res) => {
    const { nomeAluno, resumoAula, fotoAula, location } = req.body;
    const newPresenca = new Presenca({ nomeAluno, resumoAula, fotoAula, location });

    try {
        const savedPresenca = await newPresenca.save();
        res.status(201).json(savedPresenca);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePresenca = async (req, res) => {
    try {
        const updatedPresenca = await Presenca.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPresenca);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePresenca = async (req, res) => {
    try {
        await Presenca.findByIdAndDelete(req.params.id);
        res.json({ message: 'Presenca deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
