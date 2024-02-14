const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb',
};

app.get('/', (_req, res) => {
  insertTableName(res);
});

app.listen(PORT, () => {
  console.log(`Port: ${PORT} 🚀`);
});

function insertTableName(res) {
  const name = 'Rodrigo'
  const connection = mysql.createConnection(dbConfig);
  const INSERT_QUERY = `INSERT INTO people(name) values('${name}')`;

  connection.query(INSERT_QUERY, (error, _results, _fields) => {
    if (error) {      
      res.status(500).send('Erro insert');
      return;
    }
    
    getAllNames(res, connection);
  });
}

function getAllNames(res, connection) {
  const SELECT_QUERY = `SELECT id, name FROM people`;

  connection.query(SELECT_QUERY, (error, results) => {
    if (error) {      
      res.status(500).send('Error select');
      return;
    }

    const tableRows = results.map((person) => `
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
      `
      )
      .join('');
    const table = `
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>${tableRows}
      </table>`;

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      ${table}
    `);

    connection.end();
  });
}
