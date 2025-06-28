const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create the Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

module.exports = sequelize;

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
