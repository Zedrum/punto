const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/punto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sequelizeMySQL = new Sequelize('mysql://root:root@localhost:3306/punto');

const sequelizeSQLite = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'punto.sqlite'),
});

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({}));

const GameSchema = new mongoose.Schema({
  n_players: Number,
  winning_player: Number,
  winner_color: String,
  winner_score: Number,
  plays: [{ 
    player: Number,
    card: Number,
    x: Number,
    y: Number,
  }],
});

const GameModel = mongoose.model('games', GameSchema);

const GameSQLModel = sequelizeMySQL.define('Games', {
  n_players: { type: DataTypes.INTEGER },
  winning_player: { type: DataTypes.INTEGER },
  winner_color: { type: DataTypes.STRING }, // Modification du schéma pour winner_color être une chaîne de caractères
  winner_score: { type: DataTypes.INTEGER },
});

const PlaySQLModel = sequelizeMySQL.define('Plays', {
  game_id: { type: DataTypes.INTEGER, allowNull: false },
  player: { type: DataTypes.INTEGER },
  card: { type: DataTypes.INTEGER },
  x: { type: DataTypes.INTEGER },
  y: { type: DataTypes.INTEGER },
});

const GameSQLiteModel = sequelizeSQLite.define('Games', {
  n_players: { type: DataTypes.INTEGER },
  winning_player: { type: DataTypes.INTEGER },
  winner_color: { type: DataTypes.STRING }, // Modification du schéma pour winner_color être une chaîne de caractères
  winner_score: { type: DataTypes.INTEGER },
});

const PlaySQLiteModel = sequelizeSQLite.define('Plays', {
  game_id: { type: DataTypes.INTEGER, allowNull: false },
  player: { type: DataTypes.INTEGER },
  card: { type: DataTypes.INTEGER },
  x: { type: DataTypes.INTEGER },
  y: { type: DataTypes.INTEGER },
});

// Vérifier et créer les tables si elles n'existent pas déjà

async function checkAndCreateTables() {
  try {
    await sequelizeMySQL.authenticate();
    console.log('Connexion établie avec MySQL.');
    await sequelizeMySQL.sync();
    console.log('Tables synchronisées avec MySQL.');

    await sequelizeSQLite.authenticate();
    console.log('Connexion établie avec SQLite.');
    await sequelizeSQLite.sync();
    console.log('Tables synchronisées avec SQLite.');
  } catch (error) {
    console.error('Erreur lors de la connexion ou de la synchronisation des tables :', error);
  }
}

checkAndCreateTables();

app.post('/mongodb', async (req, res) => {
  try {
    const { n_players, winning_player, plays, winner_color, player_scores } = req.body;

    const gameMongo = await GameModel.create({
      n_players,
      winning_player,
      winner_color,
      winner_score: player_scores[0][0],
      plays: plays.map((play, index) => ({
        ...play,
      })),
    });

    res.status(201).json({ message: 'Partie créée avec succès dans MongoDB' });
  } catch (err) {
    console.error('Erreur côté serveur (MongoDB) :', err);
    res.status(500).json({ error: 'Erreur interne du serveur (MongoDB)' });
  }
});

app.post('/mysql', async (req, res) => {
  try {
    const { n_players, winning_player, plays, winner_color, player_scores } = req.body;

    const gameSQL = await GameSQLModel.create({
      n_players,
      winning_player,
      winner_color: winner_color,
      winner_score: player_scores[0][0],
    });

    const gameId = gameSQL.id;

    const playsWithGameId = plays.map((play, index) => ({
      ...play,
      game_id: gameId,
      play_counter: index + 1,
    }));

    await PlaySQLModel.bulkCreate(playsWithGameId);

    res.status(201).json({ message: 'Partie créée avec succès dans MySQL' });
  } catch (err) {
    console.error('Erreur côté serveur (MySQL) :', err);
    res.status(500).json({ error: 'Erreur interne du serveur (MySQL)' });
  }
});

app.post('/sqlite', async (req, res) => {
  try {
    const { n_players, winning_player, plays, winner_color, player_scores } = req.body;

    const gameSQLite = await GameSQLiteModel.create({
      n_players,
      winning_player,
      winner_color: winner_color,
      winner_score: player_scores[0][0],
    });

    const gameId = gameSQLite.id;

    const playsWithGameId = plays.map((play, index) => ({
      ...play,
      game_id: gameId,
      play_counter: index + 1,
    }));

    await PlaySQLiteModel.bulkCreate(playsWithGameId);

    res.status(201).json({ message: 'Partie créée avec succès dans SQLite' });
  } catch (err) {
    console.error('Erreur côté serveur (SQLite) :', err);
    res.status(500).json({ error: 'Erreur interne du serveur (SQLite)' });
  }
});

app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});
