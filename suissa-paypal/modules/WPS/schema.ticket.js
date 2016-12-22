const mongoose = require('mongoose')
const Schema = mongoose.Schema

const codigoDeBarras = { type: String }
const udid = { type: String }
const apiKey = { type: String } // sha1(udid + chaveDoCliente)
const ticketValido = { type: String }
const numeroTicket = { type: String }
const dataDeEntrada = { type: Date }
const setor = { type: String }
const tarifa = { type: Number }
const tarifaPaga = { type: Number }
const mensagemValidacao = { type: String }
const idGaragem = { type: String }
const cnpjGaragem = { type: String }
const garagem = { type: String }

const structure = {
  codigoDeBarras,
  udid,
  apiKey,
  ticketValido,
  numeroTicket,
  dataDeEntrada,
  setor,
  tarifa,
  tarifaPaga,
  mensagemValidacao,
  idGaragem,
  cnpjGaragem,
  garagem
}

const schema = new Schema(structure)


module.exports = schema