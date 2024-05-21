const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const cors = require('cors');
app.use(cors());


const PORT = 3001;

const sequelize = new Sequelize('Mapping', 'postgres', 'alihaider', {
  host: 'localhost',
  dialect: 'postgres',
});

const Direction = sequelize.define('Direction', {
  x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Sync the model with the database (create the table if it doesn't exist)
        await Direction.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
connection();

app.get('/data', async (req, res) => {
  try {
      const data = await Direction.findAll();
      console.log("Fetched data:");
      data.forEach(item => {
        console.log(`x: ${item.x}, y: ${item.y}`);
      });
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
