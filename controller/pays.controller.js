require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const paysModel = require('../models/pagos')(connection, Sequelize);
const { Op } = require("sequelize");

const listPays = async () => await paysModel.findAll();

module.exports = {listPays};