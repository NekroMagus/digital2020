const Sequelize = require("sequelize");
import dotenv from 'dotenv'
dotenv.config();

const LOGIN = process.env.POSTGRES_USER || 'postgres';
const PASSWORD = process.env.POSTGRES_PASSWORD ||  'password';
const DATABASE = process.env.POSTGRES_DB || 'digital2020';
const HOST = process.env.POSTGRES_HOST || 'localhost';

const sequelize = new Sequelize(DATABASE, LOGIN, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  logging: false,
  underscored: true
});

sequelize.sync({force: false})
    .then(result => {
      // console.log(result);
    })
    .catch(err => console.log(err));


export default sequelize;