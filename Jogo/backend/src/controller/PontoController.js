const Pontos = require('../models/Pontos');

module.exports = {
    async get(req,res){
        const pontos = await Pontos.find().sort("points").limit(5);
        return res.json(pontos);
    },

    async set(req,res){

        const {points} = req.body;

        const dados = await Pontos.create({
            points,
        });

        return res.json(dados);
    }
}