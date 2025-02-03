require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const xml2js = require('xml2js').parseString;

const app = express();

app.use(cors()); 

app.get('/matches', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY; 
    const apiUrl = `https://sports.ultraplay.net/sportsxml?clientKey=${apiKey}&sportId=2357`;

    const response = await fetch(apiUrl); 

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch matches. Status: ${response.statusText}`,
      });
    }

    const data = await response.text();

    xml2js(data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse XML data' });
      }

      res.json(result);
    });
  } catch (err) {
    console.error('Error fetching matches:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});