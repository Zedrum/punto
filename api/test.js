const axios = require('axios');

const apiUrl = 'http://localhost:5000/';  // Remplacez cela par votre URL API

// Générer des données aléatoires pour simuler un POST
const randomNumberOfPlayers = Math.floor(Math.random() * 4) + 2;  // Génère un nombre aléatoire entre 2 et 5
const postData = { n_players: randomNumberOfPlayers };

// Envoyer la requête POST
axios.post(apiUrl, postData)
  .then(response => {
    console.log('Réponse du serveur :', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la requête POST :', error.message);
    if (error.response) {
      // La requête a été faite, mais le serveur a répondu avec un code d'erreur
      console.error('Statut de la réponse :', error.response.status);
      console.error('Données de la réponse :', error.response.data);
      console.error('En-têtes de la réponse :', error.response.headers);
    } else if (error.request) {
      // La requête n'a pas été faite
      console.error('La requête n\'a pas été faite :', error.request);
    } else {
      // Une autre erreur s'est produite lors de la configuration de la requête
      console.error('Erreur lors de la configuration de la requête :', error.message);
    }
  });
