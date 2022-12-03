/* eslint-disable strict */
const mysql = require('mysql2/promise');

module.exports = async (app) => {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      database: 'Library',
    });
    console.log('connected to database!!');
    app.mysql = connection;
  } catch (err) {
    console.log('failed connect database!!', err);
  }
};
