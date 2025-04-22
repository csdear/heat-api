require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Allow requests from Angular

const config = {
  server: 'localhost', 
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: 'ntlm',
    options: {
      domain: process.env.DB_DOMAIN,
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  }
};

// Sample endpoint to get data
app.get('/api/coordinates', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM coordinates');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});