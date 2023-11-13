// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Sequelize, DataTypes } = require('sequelize');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/punto');

// MySQL connection
const sequelize = new Sequelize('mysql://root:root@localhost:3306/punto');

// SQLite connection
// Ensure that the SQLite database file exists
const sqlite3 = require('sqlite3').verbose();
const sqliteDB = new sqlite3.Database('./punto.db');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// MongoDB model
const GameModel = mongoose.model('Game', {
  n_players: Number,
  cur_player: Number,
  // Add other properties as needed
});

// MySQL model
const GameSQLModel = sequelize.define('Game', {
  n_players: { type: DataTypes.INTEGER },
  cur_player: { type: DataTypes.INTEGER },
  // Add other properties as needed
});

// SQLite model
sqliteDB.serialize(() => {
  sqliteDB.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      n_players INTEGER,
      cur_player INTEGER
      -- Add other columns as needed
    )
  `);
});

// Express routes

// Create a new game
app.post('/', async (req, res) => {
  try {
    const { n_players, cur_player } = req.body;

    // MongoDB
    console.log('Before MongoDB create');
    const mongoCollectionExists = await mongoose.connection.db.listCollections({ name: 'games' }).hasNext();
    if (!mongoCollectionExists) {
      await mongoose.connection.createCollection('games');
    }
    const gameMongo = await GameModel.create({ n_players, cur_player });
    console.log('After MongoDB create');

    // MySQL
    console.log('Before MySQL create');
    const mysqlTableExists = await sequelize.getQueryInterface().showAllTables().then((tables) => tables.includes('Games'));
    if (!mysqlTableExists) {
      await sequelize.sync();
    }
    const gameSQL = await GameSQLModel.create({ n_players, cur_player });
    console.log('After MySQL create');

    // SQLite
    console.log('Before SQLite insert');
    sqliteDB.run(
      'INSERT INTO games (n_players, cur_player) VALUES (?, ?)',
      [n_players, cur_player],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        console.log('After SQLite insert');
        res.status(201).json({ message: 'Game created successfully' });
      }
    );
  } catch (err) {
    console.error('Erreur côté serveur :', err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all games
app.get('/', async (req, res) => {
  try {
    // MongoDB
    const gamesMongo = await GameModel.find();

    // MySQL
    const gamesSQL = await GameSQLModel.findAll();

    // SQLite
    sqliteDB.all('SELECT * FROM games', (err, gamesSQLite) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      const games = {
        mongo: gamesMongo,
        sql: gamesSQL,
        sqlite: gamesSQLite,
      };

      res.status(200).json(games);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
