require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/config");
const orderStatus_model = require('../models/order_status')

const listOrderStatus = async () => await orderStatus_model.findAll();

module.exports = {listOrderStatus}