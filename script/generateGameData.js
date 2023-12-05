const axios = require('axios');

function generateGameData(numGames, playsPerGame) {
  const n_players = 4;
  const colors = ['Red', 'Yellow', 'Cyan', 'Green'];

  const allGames = [];
  for (let gameIndex = 0; gameIndex < numGames; gameIndex++) {
    const winning_player = Math.floor(Math.random() * n_players);
    const winner_color = colors[Math.floor(Math.random() * colors.length)];

    const plays = [];
    const player_scores = [];

    for (let i = 0; i < n_players; i++) {
      const playerMoves = [];
      let score = 0;

      for (let j = 0; j < playsPerGame; j++) {
        const card = Math.floor(Math.random() * 10);
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        playerMoves.push({ player: i, card, x, y, play_counter: j });
        score += card;
      }

      const sortedMoves = playerMoves.sort((a, b) => b.card - a.card);
      score = sortedMoves.slice(0, 2).reduce((acc, val) => acc + val.card, 0);

      player_scores.push(score);
      plays.push(...sortedMoves);
    }

    const shuffledPlays = [];
    for (let i = 0; i < playsPerGame; i++) {
      for (let j = 0; j < n_players; j++) {
        const move = plays.find(play => play.player === j && play.play_counter === i);
        if (move) {
          shuffledPlays.push(move);
        }
      }
    }

    allGames.push({
      n_players,
      winning_player,
      plays: shuffledPlays,
      winner_color,
      player_scores: [player_scores],
    });
  }

  return allGames;
}

async function sendDataToAPI() {
  const numGames = 10; // Choix du nombre de parties
  const playsPerGamePerPlayer = 20; // Choix du nombre de coups par joueur par partie

  const gameData = generateGameData(numGames, playsPerGamePerPlayer);
  const apiUrlMongoDB = 'http://localhost:5000/mongodb';
  const apiUrlMySQL = 'http://localhost:5000/mysql';
  const apiUrlSQLite = 'http://localhost:5000/sqlite';

  try {
    for (let i = 0; i < gameData.length; i++) {
      const responseMongoDB = await axios.post(apiUrlMongoDB, gameData[i]);
      console.log('MongoDB:', responseMongoDB.data.message);

      const responseMySQL = await axios.post(apiUrlMySQL, gameData[i]);
      console.log('MySQL:', responseMySQL.data.message);

      const responseSQLite = await axios.post(apiUrlSQLite, gameData[i]);
      console.log('SQLite:', responseSQLite.data.message);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données à l\'API :', error.message);
  }
}

sendDataToAPI();