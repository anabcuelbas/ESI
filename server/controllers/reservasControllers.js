require('dotenv/config')
const {Pool} = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: '5432'
})

const getReservas = async (req, res) => {
    const query = "SELECT * FROM reserva_servico";
    const response = await pool.query(query, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
}

const addReserva = async (req, res) => {
    let nomeDono = req.body.nomeDono;
    let nascimentoDono = req.body.nascimentoDono;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let tipoVeiculo = req.body.tipoVeiculo;
    let servico = req.body.servico;
    let data = req.body.data;
    let horario = req.body.horario;

    console.log(nomeDono + " " + nascimentoDono + " " + telefone + " " + email + " " + tipoVeiculo + " " + servico + " " + data + " " + horario)

    const query = "INSERT INTO reserva_servico (NomeDono, NascimentoDono, Telefone, Email, TipoVeiculo, Servico, Data, Horario) VALUES ('" + nomeDono + "', '" + nascimentoDono + "', '" + telefone + "', '" + email + "', '" + tipoVeiculo + "', '" + servico + "', '" + data + "', '" + horario + "');"

    console.log(query)
    const response = await pool.query(query, async(err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    }); 

}

module.exports = {
    getReservas,
    addReserva
}